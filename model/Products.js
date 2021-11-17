const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    product_type: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    imageHover: {
        required: true,
        type: String
    },
    totalSupply: {
        type: Number,
        required: true
    },
    bought: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price_coin: {
        type: Number,
        required:true
    },
    addition_information: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('products', productsSchema);
