const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    address: {
        type:String,
        required: true
    },
    customerId: {
        type:String,
        required:true,
    },
    productOwnerId: {
        type: String,
        required:true
    },
    totalPrice: {
        type: Number,
        required:true,
    },
    listProducts: {
        type: Array,
        required: true
    },
    status: {
        required: true,
        type: Number
    },
    
}, {
    timestamps: true
});
module.exports =  mongoose.model('orders', orderSchema);
