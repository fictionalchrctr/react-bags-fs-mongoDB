import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addProductInCart } from '../store/cartSlice'
import { getIsLoggedIn } from '../store/authSlice'
// import Product from './product'

// import Search from '../components/search'
// import Sort from '../components/sort'
// import Categories from '../components/categories'

const ProductsList = ({ products }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const navigate = useNavigate()

  const handleAdd = (product) => {
    if (!isLoggedIn) {
      return navigate('login')
    }
    return dispatch(addProductInCart(product))
  }

  // const createNewGood = () => {
  //   navigate('/admin/good/new')
  // }

  return (
    <div className=' products flex flex-wrap '>
      {products.map((p) => (
        <div
          key={p._id}
          className='product card border-solid border-[1px] border-[#f3f3f3] rounded-[40px] w-[236px] p-7 mx-4 mb-8 hover:transition hover:shadow-lg hover:-translate-y-2 duration-200 cursor-pointer'
        >
          <Link to={`/product/${p._id}`}>
            <img
              src={p.img}
              alt='Product'
              className='h-[150px] w-[150px] max-w-full'
            />
            <h5 className='font-normal text-sm mt-3'>{p.name}</h5>
          </Link>
          <div className='flex justify-between items-center pt-1'>
            <div className='product__price flex flex-col'>
              <span className='uppercase opacity-50 text-sm'>Цена:</span>
              <b className='text-sm'>{p.price + ` ₽`}</b>
            </div>
            <button
              className='bg-gray-50 leading-6 px-3 py-2 rounded-[30px] mx-1 font-normal cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
              onClick={() => handleAdd(p)}
            >
              В корзину
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductsList
