import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { getAuthUser, signUp } from '../store/authSlice'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import TextField from '../components/textField'
import Button from '../components/button'

const signUpSchema = yup.object().shape({
  name: yup.string().required('Имя обязательно для заполнения'),
  password: yup
    .string()
    .required('Пароль обязателен для заполнения')
    .matches(
      /(?=.*[A-Z])/,
      'Пароль должен содержать хотя бы одну заглавную букву'
    )
    .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
  email: yup
    .string()
    .required('Электронная почта обязательна для заполнения')
    .email('Email введён некорректно'),
})

const SignUpPage = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(getAuthUser())

  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/'
  console.log('signup location', location)

  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    name: '',
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
      signUpSchema
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
    dispatch(signUp({ payload: data, setErrors }))
  }

  if (authUser) return <Navigate to={fromPage} />

  return (
    <div className='my-20 m-auto p-10 justify-center text-sm max-w-lg rounded-3xl bg-peachSalmon shadow-sm'>
      <h1 className='text-white text-primary text-center mb-6 text-5xl '>
        Sign Up
      </h1>
      <form className='text-white' onSubmit={handleSubmit}>
        <TextField
          label='Username'
          name='name'
          onChange={handleChange}
          error={errors.name}
          value={data.name}
        />
        <TextField
          label='Email'
          name='email'
          onChange={handleChange}
          error={errors.email}
          value={data.email}
        />
        <TextField
          label='Password'
          name='password'
          type='password'
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button disabled={!isValid}>Sign Up</Button>
      </form>
      <NavLink className='text-white text-center m-auto underline' to='/login'>
        Log In
      </NavLink>
    </div>
  )
}

export default SignUpPage
