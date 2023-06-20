import { getCurrentCart } from '../service/localStorage.service'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLocalStorage = () => {
  const data = getCurrentCart()
  const entities = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(entities)
  console.log(totalPrice)

  return {
    entities,
    totalPrice,
  }
}
