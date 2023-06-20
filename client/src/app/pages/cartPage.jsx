import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, getCartPrice, makeCartEmpty } from '../store/cartSlice'
import BackButton from '../components/backButton'
import { Link } from 'react-router-dom'
import CartItem from '../components/cartItem'
import CartEmpty from '../components/cartEmpty'
import OverlayingPopup from '../components/common/portal/overlayingPopup'
import Button from '../components/button'

const CartPage = () => {
  const currentCart = useSelector(getCart())

  const dispatch = useDispatch()
  const totalPrice = useSelector(getCartPrice())

  const [active, setActive] = useState(false)
  const showPopup = () => {
    setActive((prevState) => !prevState)
  }

  const [showPopover, setShowPopover] = useState(false)

  const handleClearCart = () => {
    dispatch(makeCartEmpty())
  }

  console.log('currentCart', currentCart)

  if (!totalPrice) {
    return <CartEmpty />
  }

  return (
    <div className='cart p-10 m-auto max-w-4xl '>
      <div className='cart__top flex justify-between items-center'>
        <h2 className='content__title flex m-0 items-center text-2xl '>
          Ваша корзина
        </h2>
        <div
          className='cart__clear flex items-center cursor-pointer'
          onClick={() => {
            handleClearCart()
          }}
        >
          <span className='inline-block ml-2 text-gray-500 transition-all ease-in-out hover:text-bloodRuby'>
            Очистить корзину
          </span>
        </div>
      </div>
      <div className='content__items block'>
        {currentCart.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className='cart__bottom  my-12 mx-0    '>
        <div className='cart__bottom-details flex justify-between'>
          <span className='text-xl'>
            Сумма заказа:
            <b>{` ${totalPrice} ₽`}</b>
          </span>
        </div>
        <div className='cart__bottom-buttons flex justify-between mt-10'>
          <BackButton />
          <Link to='/'>
            <span className=' flex items-center justify-center bg-gray-50 px-5 py-3 rounded-[30px]  mx-[5px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'>
              Оформить заказ
            </span>
          </Link>
        </div>
      </div>
      {/* <OverlayingPopup isOpened={showPopover}>
        <div className='min-h-[30vh] max-h-[80vh] overflow-y-auto overflow-x-hidden relative p-3 bg-slate-100 w-[550px] rounded-xl flex flex-col items-center justify-center  '>
          <p className=' text-base'>Ваш заказ оформлен! Спасибо за заказ!</p>
          <Button>Отлично!</Button>
        </div>
      </OverlayingPopup> */}
    </div>
  )
}

export default CartPage
