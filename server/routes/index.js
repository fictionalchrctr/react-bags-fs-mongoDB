const express = require('express')
const router = express.Router({ mergeParams: true })

// /api/auth
router.use('/auth', require('./auth.routes'))

// /api/product
router.use('/product', require('./product.routes'))

// /api/category
router.use('/category', require('./category.routes'))

// /api/user
router.use('/user', require('./user.routes'))

module.exports = router
