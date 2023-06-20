import { createSlice } from '@reduxjs/toolkit'
import categoryService from '../service/category.service'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true
    },
    categoriesRecieved: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    },
    categoriesRequestFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    createCategoryRequested: (state) => {
      state.isLoading = true
    },
    createCategoryRecieved: (state, action) => {
      state.isLoading = false
      state.entities.push(action.payload)
    },
    createCategoryRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    updateCategoryRequested: (state) => {
      state.isLoading = true
    },
    updateCategorySuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex(
          (category) => (category._id = action.payload._id)
        )
      ] = action.payload
    },
    updateCategoryRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    removeCategoryRequested: (state) => {
      state.isLoading = true
    },
    categoryRemoved: (state, action) => {
      state.isLoading = false
      state.entities = state.entities.filter(
        (category) => category._id !== action.payload
      )
    },
    removeCategoryRequestedFailed: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

const { reducer: categoriesReducer, actions } = categorySlice
const {
  categoriesRequested,
  categoriesRecieved,
  categoriesRequestFailed,
  createCategoryRequested,
  createCategoryRecieved,
  createCategoryRequestedFailed,
  updateCategoryRequested,
  updateCategorySuccessed,
  updateCategoryRequestedFailed,
  removeCategoryRequested,
  categoryRemoved,
  removeCategoryRequestedFailed,
} = actions

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested())
  try {
    const categories = await categoryService.fetchAllCategories()
    dispatch(categoriesRecieved(categories))
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message))
  }
}

export const createCategory = (data) => async (dispatch) => {
  dispatch(createCategoryRequested())
  try {
    const newCategory = await categoryService.createCategory(data)
    dispatch(createCategoryRecieved(newCategory))
  } catch (error) {
    dispatch(createCategoryRequestedFailed(error.message))
  }
}

export const updateCategory = (data) => async (dispatch) => {
  dispatch(updateCategoryRequested())
  try {
    const updatedCategory = await categoryService.updateCategory(data)
    dispatch(updateCategorySuccessed(updatedCategory))
  } catch (error) {
    dispatch(updateCategoryRequestedFailed(error.message))
  }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(removeCategoryRequested())
  try {
    await categoryService.removeCategory(categoryId)
    dispatch(categoryRemoved(categoryId))
  } catch (error) {
    dispatch(removeCategoryRequestedFailed(error.message))
  }
}

export const getCategories = () => (state) => state.category.entities
export const getCategoryById = (id) => (state) =>
  state.category.entities.find((category) => category._id === id)

export default categoriesReducer
