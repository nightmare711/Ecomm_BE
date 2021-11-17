const express = require('express')
const UsersController = require('../controller/Users.controller')

const router = express.Router()

router.get('/', UsersController.getUsers)
router.get('/:id', UsersController.getUserById)
router.post('/new', UsersController.postUser)
router.post('/update/:id', UsersController.updateUser)

module.exports = router