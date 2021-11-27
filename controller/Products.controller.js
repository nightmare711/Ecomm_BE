const Product = require('../model/Products')
const User = require('../model/Users')

exports.getProducts = (req,res,next) => {
    const size = req.query.size
    return Product.find().then(result => {
        if(size) {
            result.length = size
            res.status(200).json({
                message: 'successful',
                status:1,
                result: result
            })
        }
        res.status(200).json({
            message: 'successful',
            status:1,
            result: result
        })
    }).catch(err => res.status(500).json({
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
    const { productOwner ,name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information} = req.body
    const product = new Product({productOwner, name, product_type, price, image, imageHover, totalSupply, bought, description, price_coin, addition_information})
    return User.findById(productOwner).then(user => {
        if(user) {
            return Product.findOne({name: name}).then(result => {
                if(!result) {
                    return product.save().then(result => res.status(201).json({
                        message: 'successful',
                        status: 1
                    }))
                } else {
                    return res.status(500).json({
                        message: 'Duplicated data',
                        status: 0
                    })
                }
            }).catch(err => res.status(500).json({
                message: err.message,
                status: 0
            }))
        }
    })
}

exports.updateProduct = (req,res,next) => {
    const productId = req.params.productId
    const { name, product_type, price, image, imageHover, totalSupply, description, price_coin} = req.body
    return Product.findById(productId).then(product => {
        if(product) {
            product.name = name || product.name
            product.product_type = product_type || product.product_type
            product.price = price || product.price
            product.image = image || product.image
            product.imageHover = imageHover || product.imageHover
            product.totalSupply = totalSupply || product.totalSupply
            product.description = description || product.description
            product.price_coin = price_coin ||product.price_coin
            return product.save().then(result => res.status(200).json({
                message: 'Update successful',
                status: 1
            }))
        } else {
            return res.status(500).json({
                message: 'Not found product',
                status:0
            })
        }
    }).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}

exports.getProductByOwner = (req,res,next) => {
    const ownerId = req.params.ownerId
    console.log(ownerId)
    return Product.find({productOwner: ownerId}).then(result => res.status(201).json({
        message: 'successful',
        status: 1,
        result: result
    })).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}
exports.getMostProductByOwner = (req,res,next) => {
    const ownerId = req.params.ownerId
    const size = req.query.size || 1
    return Product.find({productOwner: ownerId}).then(result => {
        result.sort((a, b) => a.bought < b.bought && 1 || -1)
        if(result.length > size) {
            result.length = size
        }
        return res.status(201).json({
            message: 'successful',
            status: 1,
            result: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
} 
exports.getMostPriceByOwner = (req,res,next) => {
    const ownerId = req.params.ownerId
    const size = req.query.size || 1
    return Product.find({productOwner: ownerId}).then(result => {
        result.sort((a, b) => a.price < b.price && 1 || -1)
        
        if(result.length > size) {
            
            result.length = size
        }
        return res.status(201).json({
            message: 'successful',
            status: 1,
            result: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
} 
exports.getHighestTotalSupply = (req,res,next) => {
    const ownerId = req.params.ownerId
    const size = req.query.size || 1
    return Product.find({productOwner: ownerId}).then(result => {
        result.sort((a, b) => a.totalSupply < b.totalSupply && 1 || -1)
        
        if(result.length > size) {
            result.length = size
        }
        return res.status(201).json({
            message: 'successful',
            status: 1,
            result: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.getProductByType = (req,res,next) => {
    const type = req.params.type
    return Product.find({product_type: type}).then(result => {
        return res.status(201).json({
            message:'successful',
            status: 1,
            result: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0
    }))
}

exports.getRecentAddedProduct = (req,res,next) => {
    const size = req.query.size
    const type = req.query.type
    if(type) {
        return Product.find({product_type: type}).then(result => {
            if(result.length > size) {
                const temp = []
                for(let i = result.length - 1; i > 0 ; i--) {
                    console.log(temp.length,size)
                    if(temp.length === parseInt(req.query.size)) {
                        break;
                    }
                    temp.push(result[i])
                }
                return res.status(200).json({
                    message: 'successful',
                    status: 1,
                    result: temp
                })
            }
            return res.status(200).json({
                message: 'successful',
                status: 1,
                result: result
            })
        }).catch(err => res.status(500).json({
            message: err.message,
            status:0,
        }))
    }
    return Product.find().then(result => {
        if(result.length > size) {
            const temp = []
            for(let i = result.length - 1; i > 0 ; i--) {
                console.log(temp.length,size)
                if(temp.length === parseInt(req.query.size)) {
                    break;
                }
                temp.push(result[i])
            }
            return res.status(200).json({
                message: 'successful',
                status: 1,
                result: temp
            })
        }
        return res.status(200).json({
            message: 'successful',
            status: 1,
            result: result
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status:0,
    }))
}