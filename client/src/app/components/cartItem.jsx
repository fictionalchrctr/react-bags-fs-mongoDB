import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addProductInCart,
  removeOneProductFromCart,
  removeProductFromCart,
} from '../store/cartSlice'
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

const CartItem = (item) => {
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(addProductInCart(item))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(item._id))
  }

  const handleRemoveOneProduct = () => {
    dispatch(removeOneProductFromCart(item._id))
  }

  return (
    <div
      // key={item._id}
      className=' cart__item flex w-full  mt-[30px] p-1 border-solid border-[1px] border-[#f3f3f3] rounded-[40px] '
    >
      <div className='cart__item-img flex items-center mx-4 w-[10%]'>
        <img src={item.img} alt='bag' className=' rounded-md w-20 h-20  ' />
      </div>
      <div className='cart__item-info flex justify-center items-center w-2/5'>
        <h3 className=' font-bold text-xl'>{item.name}</h3>
      </div>
      <div className='cart__item-count flex items-center justify-between w-[13%]'>
        <MinusCircleIcon
          className='cart__item-count-minus   h-6 w-6  text-gray-500 cursor-pointer transition-all ease-in-out hover:text-bloodRuby '
          onClick={handleRemoveOneProduct}
        />
        <b className=' text-xl'>{item.count}</b>
        <PlusCircleIcon
          className='cart__item-count-plus     h-6 w-6   text-gray-500 cursor-pointer transition-all ease-in-out hover:text-bloodRuby '
          onClick={handleAdd}
        />
      </div>
      <div className='cart__item-price    flex items-center justify-center w-1/3'>
        <b className=' font-bold text-xl'>{item.price * item.count + ` ₽`}</b>
      </div>
      <div className='cart__item-remove flex items-center justify-end mx-4 '>
        <TrashIcon
          className='   h-6 w-6  text-gray-500 cursor-pointer transition-all ease-in-out hover:text-bloodRuby '
          onClick={handleRemoveFromCart}
        />
      </div>
    </div>
  )
}

export default CartItem
