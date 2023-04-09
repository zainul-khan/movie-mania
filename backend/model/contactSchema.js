const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    query:{
        type:String,
        required:true
    }
})

const contactUs = mongoose.model("contact", contactSchema)
module.exports = contactUs