import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <button
      onClick={handleGoBack}
      className='flex items-center justify-center bg-gray-50 px-5 py-3 rounded-[30px] mx-9 my-3 font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
    >
      <p>Назад</p>
    </button>
  )
}

export default BackButton
