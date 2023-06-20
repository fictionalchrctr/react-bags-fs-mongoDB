import config from '../config.json'
import httpService from './http.service'
import localStorageService from './localStorage.service'

const url = config.apiEndpoint + '/auth'

const authService = {
  register: async (userData) => {
    const { data } = await httpService.post(url + '/signUp', userData)
    return data
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(url + '/login', { email, password })
    return data
  },
  refresh: async () => {
    const { data } = await httpService.post(url + '/token', {
      refreshToken: localStorageService.getRefreshToken(),
    })
    return data
  },
}

export default authService
