import httpService from './http.service'
import config from '../config.json'

const url = config.apiEndpoint + '/product'

const productService = {
  fetchAllProducts: async () => {
    const { data } = await httpService.get(url)
    return data
  },
  getProductById: async (id) => {
    const { data } = await httpService.get(url + `/${id}`)
    return data
  },
  createProduct: async (product) => {
    const { data } = httpService.put(url + '/createProduct', product)
    return data
  },
  updateProduct: async (product) => {
    const { data } = httpService.patch(url + '/updateProduct', product)
    return data
  },
  removeProduct: async (id) => {
    const { data } = await httpService.delete(url + `/${id}`)
    return data
  },
}

export default productService
