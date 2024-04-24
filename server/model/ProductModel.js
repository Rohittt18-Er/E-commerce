const mongoose = require("mongoose")
const Review = require("./reviewModel")
var autopopulate = require('mongoose-autopopulate');

const imageSchema = mongoose.Schema({
    path: {
        type: String,
        reuired: true
    }
})

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    },
    reviewsCount: {
        type: Number
    },
    sales: {
        type: Number
    },

    attrs: [
        { key: { type: String }, value: [{ type: String }] }
    ],
    images: [imageSchema],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Review
    }]
    ,

}, {
    timestamps: true
})

productSchema.plugin(autopopulate);
productSchema.index({ name: "text", description: "text" }, { name: "TextIndex" }) //it hepls for faster search
productSchema.index({ "attrs.keys": 1, "attrs.value": 1 })
productSchema.index({ name: -1 })

const Product = mongoose.model("Product", productSchema)

module.exports = Product

