const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema({
    id: {
        type:String,
        required:true
    }, 
    summary: {
        type:Array,
        required:true
    }

}, {
    timestamps: true
});

module.exports =  mongoose.model('Summary', summarySchema);
