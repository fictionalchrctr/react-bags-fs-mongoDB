import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCartEntities,
  getCartPrice,
  makeCartEmpty,
} from '../store/cartSlice'
import BackButton from '../components/backButton'
import { Link } from 'react-router-dom'
import CartItem from '../components/cartItem'
import CartEmpty from '../components/cartEmpty'
import OverlayingPopup from '../components/common/portal/overlayingPopup'
import Button from '../components/button'

const CartPage = () => {
  const totalPrice = useSelector(getCartPrice())

  const currentCart = useSelector(getCartEntities())

  const dispatch = useDispatch()

  const [active, setActive] = useState(false)
  const showPopup = () => {
    setActive((prevState) => !prevState)
  }

  const handleClearCart = () => {
    dispatch(makeCartEmpty())
  }

  // временная мера
  const handleSuccessOrder = () => {
    showPopup()
    dispatch(makeCartEmpty())
  }

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className='p-10 m-auto max-w-4xl '>
      <div className=' flex justify-between items-center'>
        <h2 className=' flex m-0 items-center text-2xl '>Ваша корзина</h2>
        <div
          className=' flex items-center cursor-pointer'
          onClick={() => {
            handleClearCart()
          }}
        >
          <span className='inline-block ml-2 text-gray-500 transition-all ease-in-out hover:text-bloodRuby'>
            Очистить корзину
          </span>
        </div>
      </div>
      <div className=' block'>
        {currentCart.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className=' my-12 mx-0    '>
        <div className=' flex justify-between'>
          <span className='text-xl'>
            Сумма заказа:
            <b>{` ${totalPrice} ₽`}</b>
          </span>
        </div>
        <div className='flex justify-between mt-10'>
          <BackButton />

          <span
            onClick={showPopup}
            className='flex items-center justify-center bg-gray-50 px-5 py-3 rounded-[30px] mx-9 my-3 font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
          >
            Оформить заказ
          </span>
        </div>
      </div>

      <OverlayingPopup isOpened={active} onClose={showPopup}>
        <div className=' flex justify-center items-center fixed inset-0 p-9 bg-slate-50 bg-opacity-40'>
          <div className='min-h-[30vh] max-h-[80vh] overflow-y-auto overflow-x-hidden relative p-3 bg-slate-100 w-[550px] rounded-xl flex flex-col items-center justify-center  '>
            <p className=' text-base'>Ваш заказ оформлен! Спасибо за заказ!</p>
            <Link to='/'>
              <Button onClick={handleSuccessOrder}>Отлично!</Button>
            </Link>
          </div>
        </div>
      </OverlayingPopup>
    </div>
  )
}

export default CartPage
