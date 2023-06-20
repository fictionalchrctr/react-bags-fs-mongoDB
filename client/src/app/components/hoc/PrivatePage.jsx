import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getAuthUser } from '../../store/authSlice'
import { Navigate, useLocation } from 'react-router-dom'

const PrivatePage = ({ children }) => {
  const authUser = useSelector(getAuthUser())
  const location = useLocation()

  if (!authUser) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  return children
}

PrivatePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default PrivatePage
