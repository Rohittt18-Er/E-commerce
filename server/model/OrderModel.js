const mongoose = require('mongoose')
const User = require('./userModel')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    orderTotal: {
        itemsCount: { type: Number, required: true },
        cartSubtotal: { type: Number, required: true }
    },
    cartItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                path: {
                    type: String,
                    required: true
                }
            },
            quantity: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            }


        }
    ],
    transactionResult:{
        status:{type:Number},
        createTime:{type:String},
        amount:{type:Number}
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        default:false,
        required:true
    },
    deliveredAt:{
        type:Date
    }
},{timestamps:true})


const Order = mongoose.model("Order",orderSchema)

module.exports =Order