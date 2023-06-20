// 1. У любого пользователя в бд будет как минимум products & categories
// 2. Они равны (изначальным)mock данным

const Category = require('../models/Category')
const Product = require('../models/Product')
const categoriesMock = require('../mock/categories.json')
const productsMock = require('../mock/products.json')

module.exports = async () => {
  const categories = await Category.find()
  if (categories.length !== categoriesMock.length) {
    await crateItitialEntity(Category, categoriesMock)
  }

  const products = await Product.find()
  if (products.length !== productsMock.length) {
    await crateItitialEntity(Product, productsMock)
  }
}

async function crateItitialEntity(Model, dataMock) {
  await Model.collection.drop() // чистим сущность, которая помещена в Model
  return Promise.all(
    // сохраняем каждый элемент(item), который есть в data Mock
    dataMock.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save() // метод save все локально записанные данные сохраняет в бд монго
        return newItem
      } catch (error) {}
    })
  )
}
