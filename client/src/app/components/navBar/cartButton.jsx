import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getCart } from '../../store/cartSlice'
import { setCurrentCart } from '../../service/localStorage.service'

const CartButton = ({ link }) => {
  const { entities, totalPrice } = useSelector(getCart())

  const isMounted = useRef(false)

  useEffect(() => {
    // если это первый рендер, то не делаем
    if (isMounted.current) {
      const jsonEntities = JSON.stringify(entities)
      setCurrentCart(jsonEntities)
    }
    isMounted.current = true
  }, [entities])

  return (
    <NavLink to={link}>
      <li className='  cursor-pointer inline-flex'>
        <span className=' text-gray-400 font-normal text-sm inline-flex my-3.5'>
          {totalPrice + ` ₽`}
        </span>
        <img
          alt='cart'
          src='/img/cart-svg.png'
          className='my-3.5 mx-1 w-[18px] h-[18px]'
        />
      </li>
    </NavLink>
  )
}

CartButton.protoTypes = {
  link: PropTypes.string,
}

export default CartButton
