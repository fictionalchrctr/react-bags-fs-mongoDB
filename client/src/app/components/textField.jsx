import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return (
      'w-full px-2 py-2  rounded text-sm  h-12 focus:outline-none ring-1  hover:ring-carmineTomatoRaspberry focus:outline-none focus:ring-2 focus:ring-carmineTomatoRaspberry shadow-sm rounded-lg text-black ' +
      (error ? ' invalid' : '')
    )
  }
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  return (
    <div className='my-3  relative'>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={label}
        type={showPassword ? 'text' : type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={getInputClasses()}
      />
      {type === 'password' && (
        <button
          className='pt-3 right-2.5 xs:inline-block absolute'
          type='button'
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <EyeIcon className='relative w-6 h-6 text-black' />
          ) : (
            <EyeSlashIcon className='relative w-6 h-6 text-black' />
          )}
        </button>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

TextField.defaultProps = {
  type: 'text',
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
}

export default TextField
