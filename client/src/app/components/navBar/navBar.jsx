import React from 'react'
import { useSelector } from 'react-redux'
import HomeButton from './defaultButton'
import CartButton from './cartButton'
import { getIsLoggedIn } from '../../store/authSlice'
import LoginButton from './loginButton'
import NavLogout from './navLogout'

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  return (
    <div className='navBar flex justify-between items-center p-10 border-b-[1px] border-slate-100 '>
      <HomeButton link='/' />
      <ul className='navBarRight flex items-center '>
        <CartButton link='cart' />
        {isLoggedIn ? <NavLogout /> : <LoginButton link='login' />}
      </ul>
    </div>
  )
}
export default NavBar
