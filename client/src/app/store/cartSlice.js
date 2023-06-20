import { createSlice } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../utils/calcTotalPrice'
import { getCartFromLocalStorage } from '../utils/getCartFromLocalStorage'

const initialState = getCartFromLocalStorage()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedProduct: (state, action) => {
      const findItem = state.entities.find(
        (obj) => obj._id === action.payload._id
      )
      findItem
        ? findItem.count++
        : state.entities.push({
            ...action.payload,
            count: 1,
          })
      state.totalPrice = calcTotalPrice(state.entities)
    },
    removedProduct: (state, action) => {
      state.entities = state.entities.filter((el) => el._id !== action.payload)
      state.totalPrice = calcTotalPrice(state.entities)
    },
    removeOneProduct: (state, action) => {
      const findItem = state.entities.find((obj) => obj._id === action.payload)
      if (findItem.count > 0) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.entities)
    },
    clearCart: (state) => {
      state.entities = []
      state.totalPrice = 0
    },
  },
})

const { reducer: cartReducer, actions } = cartSlice
const { addedProduct, removedProduct, removeOneProduct, clearCart } = actions

export const addProductInCart = (product) => (dispatch) => {
  dispatch(addedProduct(product))
}

export const removeProductFromCart = (productId) => (dispatch) => {
  dispatch(removedProduct(productId))
}

export const removeOneProductFromCart = (productId) => (dispatch) => {
  dispatch(removeOneProduct(productId))
}

export const makeCartEmpty = () => (dispatch) => {
  dispatch(clearCart())
}

export const getCart = () => (state) => state.cart

export const getCartEntities = () => (state) => state.cart.entities

export const getCartPrice = () => (state) => state.cart.totalPrice

export default cartReducer
