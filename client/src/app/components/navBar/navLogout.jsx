import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { /* getAuthUser, */ getIsLoggedIn, logOut } from '../../store/authSlice'

const NavLogout = ({ link }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const isLoggedIn = useSelector(getIsLoggedIn())

  // console.log('currentUser', currentUser)

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div className='relative'>
      <div className='menu-trigger flex flex-col items-center'>
        <img
          alt='user'
          src={
            isLoggedIn
              ? '/img/auth-user-circle-svg.png'
              : '/img/user-circle-svg.png'
          }
          className=' ml-8 mr-4  w-[18px] h-[18px] cursor-pointer'
          onClick={() => {
            setOpen((prevState) => !prevState)
          }}
        />
      </div>

      {open && (
        <div className='dropdown-menu absolute w-[82px] p-2 my-2 right-4 border-solid border-[1px] border-[#f3f3f3] rounded-[10px]  hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200 '>
          <NavLink to={link}>
            <div onClick={handleLogout}>
              <span className='text-sm ml-2'>Log Out</span>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  )
}

NavLogout.propTypes = {
  link: PropTypes.string,
}

export default NavLogout
