import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, children, onClick }) => {
  return (
    <button
      type='submit'
      className='  bg-gray-50 text-black m-auto mb-6 mt-10 block px-5 py-3 rounded-[30px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
      onClick={onClick}
    >
      {label || children || 'button'}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  label: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
