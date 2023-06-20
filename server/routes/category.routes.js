const express = require('express')
const router = express.Router({ mergeParams: true })
const Category = require('../models/Category')

router.get('/', async (request, response) => {
  try {
    const list = await Category.find()
    response.status(200).send(list) // возвращаем клиенту
  } catch (error) {
    response.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже 1',
    })
  }
})

router.post('/createCategory', async (request, response) => {
  const category = request.body
  try {
    const exists = await Category.findOne({ name: category.name })

    if (exists) {
      return response.status(400).send(`${category.name} exists`)
    }

    const newCategory = await Category.create(category)

    response.status(200).send(newCategory)
  } catch (error) {
    response.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже 2',
    })
  }
})

router.patch('/updateCategory', async (request, response) => {
  const category = request.body
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      category._id,
      category,
      {
        new: true,
      }
    )

    response.status(200).send(updateCategory)
  } catch (error) {
    response.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже 3',
    })
  }
})

router.delete('/:categoryId', async (request, response) => {
  const { categoryId } = request.params
  try {
    const removeCategory = await Category.findById(categoryId)
    await removeCategory.remove()

    response.status(200).send(null)
  } catch (error) {
    response.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже 4',
    })
  }
})

module.exports = router
