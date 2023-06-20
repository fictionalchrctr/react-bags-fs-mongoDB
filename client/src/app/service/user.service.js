import config from '../config.json'
import localStorageService from './localStorage.service'
import httpService from './http.service'

const url = config.apiEndpoint + '/users'

const userService = {
  get: async () => {
    const { data } = await httpService.get(url)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.post(url + payload._id, payload)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      url + localStorageService.getUserId()
    )
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      url + localStorageService.getUserId,
      payload
    )
    return data
  },
}

export default userService
