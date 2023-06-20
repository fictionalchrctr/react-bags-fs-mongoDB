import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const HomeButton = ({ link, src }) => {
  return (
    <NavLink to={link}>
      {/* <img src={src} className='w-10 mr-10' />
       */}
      <div className='navBarLeft flex items-center'>
        <img alt='logo' src={src} className='m-3.5 w-10 h-10' />
        <div className='navBarInfo'>
          <h4 className='uppercase m-0'>happy hiker</h4>
          <p className='m-0 opacity-50'>Магазин рюкзаков</p>
        </div>
      </div>
    </NavLink>
  )
}

HomeButton.propTypes = {
  link: PropTypes.string,
  src: PropTypes.string,
}

export default HomeButton
