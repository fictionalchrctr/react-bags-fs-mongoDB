import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize) // itemsСount - общее кол-во товаров
  if (pageCount === 1) return null // проверка, иногда кол-ва компонентов недостаточно даже для одной страницы

  const pages = _.range(1, pageCount + 1)

  return (
    <nav>
      <ul className='list-style-none flex'>
        {pages.map((page) => (
          <li key={'page_' + page}>
            <button
              className={
                'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100' +
                (page === currentPage
                  ? ' focus:bg-[#FF7373] focus:text-white'
                  : '')
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}

export default Pagination
