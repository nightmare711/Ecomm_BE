const express = require('express')
const ProductController = require('../controller/Products.controller')

const router = express.Router()
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.postProduct)

module.exports = router
