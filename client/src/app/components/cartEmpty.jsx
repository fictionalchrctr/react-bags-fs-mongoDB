import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
  return (
    <div className=' my-20 mx-auto max-w-4xl text-center'>
      <h1 className='text-center m-4 p-4 text-lg font-bold '>
        Ваша корзина пуста :(
      </h1>
      <Link to='/'>
        <span className='  bg-gray-50 px-5 py-3 rounded-[30px]  m-4 p-4 font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'>
          На главную
        </span>
      </Link>
    </div>
  )
}

export default CartEmpty
