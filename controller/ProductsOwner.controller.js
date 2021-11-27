const ProductOwner = require('../model/ProductOwner')
const Products = require('../model/Products')

exports.getProductsOwner = (req,res,next) => {
    return ProductOwner.find().then(result => res.status(200).json({
        message: 'successful',
        status:1,
        result: result
    })).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}

exports.getProductsOwnerByUserId = (req,res,next) => {
    const _userId = req.params.userId
    return ProductOwner.findOne({userId: _userId}).then(result => res.status(201).json({
        message: 'successful',
        status:1,
        result: result
    })).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}
exports.getUserIdByProductId = (req,res,next) => {
    const _productId = req.params.productId
    return ProductOwner.find().then(result => {
        for(let i = 0; i < result.length; i++) {
            if(result[i].productsId.includes(_productId)) {
                return res.status(200).json({
                    message: 'successful',
                    status:1,
                    result: result[i].userId
                })
            }
        }
        return res.status(404).json({
            message: 'Not found',
            status: 0
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}

exports.getProductsOwnerDetail = (req,res,next) => {
    const _userId = req.params.userId
    return ProductOwner.findOne({userId: _userId}).then(async (result) => {
        const products = []
        for(let i = 0; i < result.productsId.length; i++ ){
            const product = await Products.findById(result.productsId[i])
            products.push({
                name: product.name,
                product_type: product.product_type,
                price: product.price
            })
        }
        return res.status(201).json({
            message: 'successful',
            status:1,
            result: {
                productDetail: products
            }
        })
    }).catch(err => res.status(500).json({
        message: err.message,
        status: 0
    }))
}
