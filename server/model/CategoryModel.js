const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    attrs:[
{key:{type:String},value:[{type:String}]}
    ],
    isDeleted:{
        type:Boolean
    }
})

categorySchema.index({description:1})
const Category = mongoose.model("Category",categorySchema)

module.exports=Category