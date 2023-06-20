import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import categoriesReducer from './categorySlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  product: productsReducer,
  category: categoriesReducer,
  cart: cartReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  })
}
