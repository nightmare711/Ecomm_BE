const Product = require('../model/Products')
const User = require('../model/Users')
const ProductOwner = require('../model/ProductOwner')

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
    const { userId ,name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information} = req.body
    const product = new Product({name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information})
    return User.findById(userId).then(user => {
        if(user) {
            return Product.findOne({name: name}).then(result => {
                if(!result) {
                    return product.save().then(result => {
                        const id = result.id
                        return ProductOwner.findOne({userId}).then(owner => {
                            if(owner) {
                                const productsId = owner.productsId
                                productsId.push(id)
                                owner.productsId = productsId
                                return owner.save().then(() => res.status(201).json({
                                    message: 'successful',
                                    status: 1
                                }))
                            } else {
                                const productOwner = new ProductOwner({userId, productsId: [id]})
                                return productOwner.save().then(() => res.status(201).json({
                                    message: 'successful',
                                    status: 1
                                }))
                            }
                        })
                    }).catch(err => res.status(500).json({
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
    })
}