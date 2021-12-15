const Order = require('../model/Order')
const Product = require('../model/Products')

exports.postOrder = (req,res,next) => {
    const { totalPrice, listProducts, payment, firstName, lastName, address, country,city, phone, email,addition } = req.body
    const order = new Order({  totalPrice, listProducts, payment, firstName, lastName, address, country,city, phone, email,addition, status: 0 })
    return order.save().then(async (result) => {
        for(let i = 0; i < listProducts.length; i++) {
            const product = await Product.findById(listProducts[i]._id)
            product.bought = product.bought + listProducts[i].count
            await product.save()
        }
        return res.status(201).json({
            message: 'successful',
            status:1
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}

exports.getOrderByOwner = (req,res,next) => {
    const owner = req.params.ownerId;
    return Order.find().then(result => {
        const orderProduct = []
        for(let i = 0; i < result.length; i++) {
            result[i].listProducts.map(product => {
                if(product.productOwner === owner) {
                    orderProduct.push(product)
                }
            })
        }
        return res.status(200).json({
            message: 'successful',
            status:1,
            result: orderProduct
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}