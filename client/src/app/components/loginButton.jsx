import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const LoginButton = ({ link }) => {
  return (
    <NavLink to={link}>
      <li>
        <img
          alt='user'
          src='/img/user-circle-svg.png'
          className=' m-3.5 w-[18px] h-[18px] cursor-pointer'
        />
      </li>
    </NavLink>
  )
}

LoginButton.propTypes = {
  link: PropTypes.string,
}

export default LoginButton
