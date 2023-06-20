import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Categories from '../components/categories'
import ProductsList from '../components/productsList'
import Search from '../components/search'
import Sort from '../components/sort'
import { fetchAllProducts } from '../store/productsSlice'
import { getCategories } from '../store/categorySlice'
import { paginate } from '../utils/paginate'
import Pagination from '../components/common/pagination'

const ShopPage = () => {
  const products = useSelector(fetchAllProducts())
  const categoriesList = useSelector(getCategories())

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSerarchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'price', order: 'asc' })

  const pageSize = 8

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  const handleCategorySelect = (item) => {
    if (searchQuery !== '') setSerarchQuery('')
    setSelectedCategory(item)
  }

  const handleSearchQuery = (event) => {
    setSelectedCategory(undefined)
    setSerarchQuery(event.target.value)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  function filterProducts(products) {
    const filteredProducts = searchQuery
      ? products.filter(
          (product) =>
            product.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedCategory
      ? products.filter((product) => product.category === selectedCategory._id)
      : products
    return filteredProducts
  }

  const filteredProducts = filterProducts(products)

  const count = filteredProducts.length

  const sortedProducts = _.orderBy(
    filteredProducts,
    [sortBy.iter],
    [sortBy.order]
  )
  const productsCrop = paginate(sortedProducts, currentPage, pageSize)
  const clearFilter = () => {
    setSelectedCategory()
  }

  return (
    <div className=' p-10 '>
      {
        <div>
          <div className='content-top flex items-center justify-between  '>
            {categoriesList && (
              <Categories
                categories={categoriesList}
                allCategories={clearFilter}
                setActiveCategory={handleCategorySelect}
                selectedItem={selectedCategory}
              />
            )}
            <Search onChange={handleSearchQuery} value={searchQuery} />
          </div>
          <div className='flex flex-wrap justify-between items-center p-4 mb-4'>
            <h1 className='font-bold text-2xl'>Все товары</h1>
            <Sort onSort={handleSort} selectedSortMethod={sortBy} />
          </div>
          <ProductsList products={productsCrop} />
        </div>
      }
      <div className='flex justify-center'>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default ShopPage
