import React from 'react'
import PropTypes from 'prop-types'

const Categories = ({
  categories,
  allCategories,
  setActiveCategory,
  selectedItem,
}) => {
  return (
    <div className='categories flex-1 overflow-auto max-w-[80%]'>
      <ul className='flex flex-wrap '>
        <li
          onClick={allCategories}
          className='bg-gray-50 px-5 py-3 rounded-[30px]  mx-[5px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200 '
        >
          Все
        </li>
        {categories.map((cat) => (
          <button
            key={cat._id}
            type='button'
            onClick={() => setActiveCategory(cat)}
            className={
              'bg-gray-50 px-5 py-3 rounded-[30px]  mx-[5px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200 ' +
              (selectedItem === cat
                ? ' focus:bg-[#FF7373] focus:text-white '
                : '')
            }
          >
            {cat.name}
          </button>
        ))}
      </ul>
    </div>
  )
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  allCategories: PropTypes.func.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
}

export default Categories
