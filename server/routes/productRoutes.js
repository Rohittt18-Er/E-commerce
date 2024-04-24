const express = require("express")
const { getProductCtrl, getSingleProduct, getBestSellers, getAdminProduct, deleteProduct, createProduct, updateProduct, uploadImage, deleteImageAPI } = require("../controllers/productCtrl")
const upload = require("../utils/multer")
const { verifyIsAdmin, verifyIsLoggedIn } = require("../middleware/verifyAuthToken")

const productRoutes = express.Router()


// userRoutes

productRoutes.get('/', getProductCtrl)

productRoutes.get('/category/:categoryName', getProductCtrl)

productRoutes.get('/search/:searchQuery', getProductCtrl)

productRoutes.get('/get-one/:id', getSingleProduct)

productRoutes.get('/sale/bestSellers', getBestSellers)

//Admin routes


productRoutes.use(verifyIsLoggedIn)
productRoutes.use(verifyIsLoggedIn)

productRoutes.get('/admin', getAdminProduct)

productRoutes.delete('/admin/:id', deleteProduct)

productRoutes.post('/createProduct', createProduct)

productRoutes.post('/updateProduct/:id', updateProduct)

productRoutes.post('/imageUpload/:productId', upload.array('photos', 5), uploadImage)

productRoutes.delete('/deleteImage/:id', deleteImageAPI)

module.exports = productRoutes