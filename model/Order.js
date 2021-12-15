const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
    payment: {
        required: true,
        type:String,
    },
    firstName: {
        required:true,
        type:String,
    },
    lastName: {
        required:true,
        type: String,
    },
    address: {
        type:String,
        required: true
    },
    country: {
        type:String, 
        required:true
    },
    city: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    }, 
    addition: {
        type: String,
    }
    
}, {
    timestamps: true
});
module.exports =  mongoose.model('orders', orderSchema);
