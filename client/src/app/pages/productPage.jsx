import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../store/productsSlice'
import { getCategories } from '../store/categorySlice'
import { addProductInCart } from '../store/cartSlice'
import BackButton from '../components/backButton'

const ProductPage = () => {
  const { productId } = useParams()
  const product = useSelector(getProductById(productId))
  const categoriesList = useSelector(getCategories())
  const dispatch = useDispatch()

  const handleAdd = (product) => {
    dispatch(addProductInCart(product))
  }

  const getNameCategory = (id) => {
    return categoriesList.find((el) => el._id === id)?.name
  }

  console.log('product', product)

  return (
    <div>
      <BackButton />
      <div className='p-10'>
        <div className='text-center justify-between text-2xl font-bold text-darkColor'>
          {product.name}
        </div>
        <div className='flex relative justify-between mt-10 text-2xl font-bold text-darkColor'>
          <img
            src={product.img}
            alt='bag'
            className='w-96 h-96 shadow-sm  rounded-3xl'
          />
          <div className='absolute p-14 text-sm shadow-sm rounded-3xl font-normal left-96 ml-10 w-textArea h-96'>
            {product.description}
          </div>
          <div className='absolute top-0 right-0 justify-items-stretch'>
            {getNameCategory(product.category)}
          </div>
          <div className='absolute p-3 bottom-0 right-0 justify-items-stretch'>
            <button
              className='bg-gray-50 px-5 py-3 rounded-[30px]  mx-[5px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
              onClick={() => handleAdd(product)}
            >
              В корзину
            </button>
            {product.price + ` ₽`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
