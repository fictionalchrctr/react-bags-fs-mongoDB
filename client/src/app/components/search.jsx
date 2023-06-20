import React from 'react'

const Search = ({ onChange, value }) => {
  return (
    <div className='search flex border-solid border-[1px] border-[#f3f3f3] rounded-[10px] mr-4 '>
      <img src='/img/search-item.svg' alt='Search' className='pl-2' />
      <input
        type='search'
        name='searchQuery'
        placeholder='Поиск...'
        onChange={onChange}
        value={value}
        className='outline-none border-0 p-2 mr-2  text-base w-52'
      />
    </div>
  )
}
export default Search
