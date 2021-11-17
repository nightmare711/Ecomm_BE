const ProductsOwnerController = require('../controller/ProductsOwner.controller')
const express = require('express')

const router = express.Router()

router.get('/', ProductsOwnerController.getProductsOwner)
router.get('/:userId', ProductsOwnerController.getProductsOwnerByUserId)
router.get('/detail/:userId', ProductsOwnerController.getProductsOwnerDetail)

module.exports = router