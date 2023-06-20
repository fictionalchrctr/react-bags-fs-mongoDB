import { createSlice } from '@reduxjs/toolkit'
import productService from '../service/product.service'

const productsSlice = createSlice({
  name: 'product',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true
    },
    productsRecieved: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    productsRequestFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    createProductRequested: (state) => {
      state.isLoading = true
    },
    productCreated: (state, action) => {
      state.isLoading = false
      state.entities.push(action.payload)
    },
    createProductRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    updateProductRequested: (state, action) => {
      state.isLoading = true
    },
    updateProductSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex(
          (product) => (product._id = action.payload._id)
        )
      ] = action.payload
    },
    updateProductRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    removeProductRequested: (state) => {
      state.isLoading = true
    },
    productRemoved: (state, action) => {
      state.isLoading = false
      state.entities = state.entities.filter(
        (product) => product._id !== action.payload
      )
    },
    removeProductRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const { reducer: productsReducer, actions } = productsSlice
const {
  productsRequested,
  productsRecieved,
  productsRequestFailed,
  createProductRequested,
  productCreated,
  createProductRequestedFailed,
  updateProductRequested,
  updateProductSuccessed,
  updateProductRequestedFailed,
  removeProductRequested,
  productRemoved,
  removeProductRequestedFailed,
} = actions

export const loadProductsList = () => async (dispatch, store) => {
  dispatch(productsRequested())
  try {
    const products = await productService.fetchAllProducts()
    dispatch(productsRecieved(products))
  } catch (error) {
    dispatch(productsRequestFailed(error.message))
  }
}

export const createProduct = (data) => async (dispatch) => {
  dispatch(createProductRequested())
  try {
    const newProduct = await productService.createProduct(data)
    dispatch(productCreated(newProduct))
  } catch (error) {
    dispatch(createProductRequestedFailed(error.message))
  }
}

export const updateProduct = (data) => async (dispatch) => {
  dispatch(updateProductRequested())
  try {
    const updatedProduct = await productService.updateProduct(data)
    dispatch(updateProductSuccessed(updatedProduct))
  } catch (error) {
    dispatch(updateProductRequestedFailed(error.message))
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(removeProductRequested())
  try {
    await productService.removeProduct(productId)
    dispatch(productRemoved(productId))
  } catch (error) {
    dispatch(removeProductRequestedFailed(error.message))
  }
}

export const fetchAllProducts = () => (state) => state.product.entities
export const getProductById = (id) => (state) =>
  state.product.entities.find((product) => product._id === id)

export default productsReducer
