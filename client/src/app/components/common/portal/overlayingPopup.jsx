import React from 'react'
import PropTypes from 'prop-types'
import Portal from './portal'

const OverlayingPopup = ({ children, onClose, isOpened }) => {
  if (!isOpened) {
    return null
  }
  return (
    <Portal>
      <div
        className='flex justify-center items-center box-border p-9'
        role='dialog'
      >
        <div
          className=' bg-slate-400 cursor-pointer'
          role='button'
          tabIndex={0}
          onClick={onClose}
        ></div>
        {children}
      </div>
    </Portal>
  )
}

OverlayingPopup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func,
  isOpened: PropTypes.bool,
}

export default OverlayingPopup
