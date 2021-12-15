const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ProductRoute = require('./routes/Products')
const UsersRoute = require('./routes/Users')
const ProductOwnerRoute = require('./routes/ProductsOwner')
const OrderRoute = require('./routes/Orders')
const cors = require('cors')

const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/products', ProductRoute)
app.use('/users', UsersRoute)
app.use('/products-owner', ProductOwnerRoute)
app.use('/orders', OrderRoute)


mongoose.connect('mongodb+srv://nightmare:KoOn711286@cluster0.uhk7r.mongodb.net/ecommerce', () => app.listen(3001, () => console.log('App listening at port 3001')))


