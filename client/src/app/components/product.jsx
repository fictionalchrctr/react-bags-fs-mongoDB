import React, { useState } from 'react'

const Product = (props) => {
  const [isProductAdded, setIsProductAdded] = useState(false)
  const handleClickAdded = () => {
    setIsProductAdded(!isProductAdded)
  }
  return (
    <div className='product card border-solid border-[1px] border-[#f3f3f3] rounded-[40px] w-[236px] p-7 mx-4 mb-8 hover:transition hover:shadow-lg hover:-translate-y-2 duration-200 cursor-pointer'>
      <img
        src='/stockholm-backpack.png'
        alt='Product'
        className='h-[133px] w-[166px] max-w-full'
      />
      <h5 className='font-normal text-sm mt-3'>Рюкзачок</h5>
      <div className='flex justify-between items-center'>
        <div className='product__price flex flex-col'>
          <span className='uppercase opacity-50 text-sm'>Цена:</span>
          <b className='text-sm'>4242 руб.</b>
        </div>
        <img
          onClick={handleClickAdded}
          src={isProductAdded ? '/img/added.svg' : '/img/plus-svg.svg'}
          alt='Plus'
          className='my-3 rounded-[8px] hover:shadow-xl '
        />
      </div>
    </div>
  )
}

export default Product
