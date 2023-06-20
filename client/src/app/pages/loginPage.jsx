import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, NavLink, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { getAuthError, getAuthUser, login } from '../store/authSlice'
import Button from '../components/button'
import TextField from '../components/textField'

const loginScheme = yup.object().shape({
  password: yup.string().required('Пароль обязателен для заполнения'),
  email: yup
    .string()
    .required('Электронная почта обязательная для заполнения')
    .email('Email введён некорректно'),
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(getAuthUser())
  const loginError = useSelector(getAuthError())
  console.log('loginError', loginError)

  const location = useLocation()

  const fromPage = location.state?.from?.pathname || '/'

  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  useEffect(() => {
    function validate() {
      loginScheme
        .validate(data)
        .then(() => {
          setErrors({})
        })
        .catch((error) => setErrors({ [error.path]: error.message }))
    }
    validate()
  }, [data])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isValid) return
    dispatch(login({ payload: data }))
  }

  return !authUser ? (
    <div className='my-20 m-auto p-10 justify-center text-sm max-w-lg rounded-3xl bg-peachSalmon shadow-sm'>
      <h1 className='text-white text-primary text-center mb-6 text-5xl '>
        Log In
      </h1>
      <form className='text-white' onSubmit={handleSubmit}>
        <TextField
          label='Email'
          name='email'
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        {loginError && <p className='text-black'>{loginError}</p>}
        <Button disabled={!isValid}>Log In</Button>
      </form>
      <NavLink className='text-white text-center m-auto underline' to='/signup'>
        Create an account
      </NavLink>
    </div>
  ) : (
    <div>
      <Navigate to={fromPage} state={{ from: location }} />
    </div>
  )
}

export default LoginPage
