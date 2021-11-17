const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    address_metamask: {
        type: String,
    },
    bio: {
        type: String
    }, 
    facebook: {
        type: String
    },
    instagram: {
        type:String
    }

}, {
    timestamps: true
});
module.exports =  mongoose.model('users', usersSchema);
