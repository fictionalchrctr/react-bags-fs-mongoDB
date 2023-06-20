import { createSlice } from '@reduxjs/toolkit'
import authService from '../service/auth.service'
import localStorageService from '../service/localStorage.service'
import generateAuthError from '../utils/generateAutthError'
import userService from '../service/user.service'

const initialState = localStorageService.getAccessToken()
  ? {
      error: null,
      isLoading: true,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      error: null,
      isLoading: false,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    }

const authSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
    },
    authRequested: (state) => {
      state.error = null
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = null
    },
    /* userUpdated: (state, action) => {
      const userIndex = state.entities.findIndex(
        (user) => user._id === action.payload._id
      )
      state.entities[userIndex] = { ...action.payload }
    }, */
  },
})

const { reducer: authReducer, actions } = authSlice
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequested,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  // userUpdated,
} = actions

export const signUp =
  ({ payload, setErrors }) =>
  async (dispatch) => {
    dispatch(authRequested())
    try {
      const data = await authService.register(payload)
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
      // history.push('/')
      // setErrors('')
    } catch (error) {
      if (error.response.status === 400) {
        setErrors(error.response.data.message)
      }
      dispatch(authRequestFailed(error.response.data.message))
    }
  }

export const login =
  ({ payload }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setTokens(data)
      // const isAdmin = data.roles.findIndex((r) => r === 'admin')
      // const role = Number(isAdmin) === -1 ? 'user' : 'admin'
      // localStorageService.setRole(role)
      dispatch(
        authRequestSuccess({ userId: data.userId /* userRole: role  */ })
      )
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const logOut = () => async (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const data = await userService.get()
    dispatch(usersReceived(data))
  } catch (error) {
    dispatch(usersRequestFailed())
  }
}

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn

export const getAuthUser = () => (state) => state.auth.auth

export const getAuthError = () => (state) => state.auth.error

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.auth.auth.userId)
    : null
}
export const getCurrentUserId = () => (state) => state.auth.auth.userId

export const getUserById = (userId) => (state) => {
  if (state.auth.entities) {
    return state.auth.entities.find((u) => u._id === userId)
  }
}

export const getUsersLoadingStatus = () => (state) => state.auth.isLoading
export const getauthDataStatus = () => (state) => state.users.dataLoaded

// export const getAdminRole = () => (state) =>
//   state.users.auth.userRole === 'admin'

export default authReducer
