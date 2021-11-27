const express = require('express')
const ProductController = require('../controller/Products.controller')

const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.postProduct)
router.get('/owner/:ownerId', ProductController.getProductByOwner)
router.get('/owner/most/:ownerId', ProductController.getMostProductByOwner)
router.get('/owner/price/:ownerId', ProductController.getMostPriceByOwner)
router.post('/update/:productId', ProductController.updateProduct)
router.get('/owner/highest-supply/:ownerId', ProductController.getHighestTotalSupply)

module.exports = router
