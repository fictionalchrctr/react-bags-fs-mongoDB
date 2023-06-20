const express = require('express')
const router = express.Router({ mergeParams: true })
const Product = require('../models/Product')

router.get('/', async (request, response) => {
  try {
    const list = await Product.find()
    response.status(200).send(list) // возвращаем клиенту
  } catch (error) {
    response.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

router.get('/:id', async (request, response) => {
  const { id } = request.params
  try {
    const product = await Product.findById(id)
    response.status(200).send(product)
  } catch (error) {
    response.status(500).json({
      message: 'Server has error. Try later',
    })
  }
})

router.post('/createProduct', async (request, response) => {
  const product = request.body
  try {
    const exists = await Product.findOne({ name: product.name })

    if (exists) {
      return response.status(400).send(`${product.name} exists`)
    }

    const newProduct = await Product.create(Product)

    response.status(200).send(newProduct)
  } catch (error) {
    response.status(500).json({
      message: 'Server has error. Try later',
    })
  }
})

router.patch('/updateProduct', async (request, response) => {
  const product = request.body
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product._id,
      Product,
      {
        new: true,
      }
    )

    response.status(200).send(updateProduct)
  } catch (error) {
    response.status(500).json({
      message: 'Server has error. Try later',
    })
  }
})

router.delete('/:ProductId', async (request, response) => {
  const { productId } = request.params
  try {
    const removeProduct = await Product.findById(productId)
    await removeProduct.remove()

    response.status(200).send(null)
  } catch (error) {
    response.status(500).json({
      message: 'Server has error. Try later',
    })
  }
})

module.exports = router
