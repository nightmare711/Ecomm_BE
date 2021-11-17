const mongoose = require('mongoose')

const productOwnerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    productsId: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});
module.exports =  mongoose.model('productsOwner', productOwnerSchema);
