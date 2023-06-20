import React from 'react'
import PropTypes from 'prop-types'

const Sort = ({ onSort, selectedSortMethod }) => {
  const sortMethods = ['price']
  const handleSort = (item) => {
    if (selectedSortMethod.iter === item) {
      onSort({
        ...selectedSortMethod,
        order: selectedSortMethod.order === 'asc' ? 'desc' : 'asc',
      })
    } else {
      onSort({ iter: item, order: 'asc' })
    }
  }

  return (
    <div className='ml-5 relative '>
      <div className='flex items-center'>
        <b className='mr-2'>Сортировка по:</b>
        {sortMethods.map((m) => (
          <button
            key={m}
            onClick={() => handleSort(m)}
            className='text-[#BE1931] border-b border-dashed border-b-[#BE1931] cursor-pointer'
          >
            {}
            <span>цене</span>
          </button>
        ))}
      </div>
    </div>
  )
}

Sort.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSortMethod: PropTypes.object.isRequired,
}

export default Sort
