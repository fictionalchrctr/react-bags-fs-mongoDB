import httpService from './http.service'
import config from '../config.json'

const url = config.apiEndpoint + '/category'

const categoryService = {
  fetchAllCategories: async () => {
    const { data } = await httpService.get(url)
    return data
  },
  createCategory: async (category) => {
    const { data } = await httpService.post(url + '/createCategory', {
      name: category,
    })
    return data
  },
  updateCategory: async (category) => {
    const { data } = await httpService.patch(url + '/updateCategory', category)
    return data
  },
  deleteCategory: async (id) => {
    const { data } = await httpService.delete(url + `/${id}`)
    return data
  },
}

export default categoryService
