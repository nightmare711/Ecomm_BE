const OrderController = require('../controller/Orders.controller')
const express =  require('express')

const router = express.Router()

router.post('/', OrderController.postOrder)
router.get('/:ownerId', OrderController.getOrderByOwner)

module.exports = router