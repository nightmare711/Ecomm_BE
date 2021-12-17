const express = require('express')
const ProductController = require('../controller/Products.controller')

const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/recent', ProductController.getRecentAddedProduct)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.postProduct)
router.get('/owner/:ownerId', ProductController.getProductByOwner)
router.get('/owner/most/:ownerId', ProductController.getMostProductByOwner)
router.get('/owner/price/:ownerId', ProductController.getMostPriceByOwner)
router.post('/update/:productId', ProductController.updateProduct)
router.get('/owner/highest-supply/:ownerId', ProductController.getHighestTotalSupply)
router.get('/type/:type', ProductController.getProductByType)
router.post('/delete/:productId', ProductController.deleteProduct)


module.exports = router
