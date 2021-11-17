const Product = require('../model/Products')

exports.getProducts = (req,res,next) => {
    return Product.find().then(result => res.status(200).json({
        message: 'successful',
        status:1,
        result: result
    })).catch(err => res.status(500).json({
        message: err,
        status: 0,

    }))
}

exports.getProductById = (req,res,next) => {
    const id = req.params.id
    return Product.findById(id).then(result => res.status(200).json({
        message: 'successful',
        status: 1,
        result: result
    })).catch(err => res.status(500).json({
        message: err,
        status: 0
    }))
}

exports.postProduct = (req,res,next) => {
    const { name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information} = req.body
    const product = new Product({name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information})
    return Product.findOne({name: name}).then(result => {
        if(!result) {
            return product.save().then(result => res.status(201).json({
                message: 'successful',
                status: 1,
            })).catch(err => res.status(500).json({
                message: err,
                status: 0
            }))
        } else {
            return res.status(500).json({
                message: 'Duplicated data',
                status: 0
            })
        }
    })
}