
// const categoryData = require("./categories")
// const productData = require("./product")
// const reviewData = require("./reviews")
// const userData = require("./user")
// const orderData = require("./orders")

// const Category = require("../model/CategoryModel")
// const Product = require("../model/ProductModel")
// const Review = require("../model/reviewModel")
// const User = require('../model/userModel')
// const Order = require("../model/OrderModel")

// const importData = async () => {
//     try {
//         // await Category.collection.dropIndexes()
//         // await Product.collection.dropIndexes()

//         // await Category.collection.deleteMany({})
//         // await Product.collection.deleteMany({})
//         // await Review.collection.deleteMany({})
//         // await User.collection.deleteMany({})
//         // await Order.collection.deleteMany({})

//         // await Category.insertMany(categoryData)
//         // const reviews = await Review.insertMany(reviewData)
//         // const sampleProducts = productData.map((product) => {
//         //     reviews.map((review) => {
//         //         product.reviews.push(review._id)
//         //     })
//         //     return {...product}
//         // })
//         // await Product.insertMany(sampleProducts)
//         // await User.insertMany(userData)
//         await Order.insertMany(orderData)

//         console.log("Seeder data proceeded successfully")
//         process.exit()
//     } catch (error) {
//         console.error("Error while proccessing seeder data", error)
//         process.exit(1);
//     }
// }
// importData()
 
// module.exports=importData