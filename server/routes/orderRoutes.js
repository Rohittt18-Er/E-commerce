const express = require('express')
const { getOrder, getOrderDetails } = require('../controllers/orderCtrl')
const { verifyIsLoggedIn } = require('../middleware/verifyAuthToken')

const orderRoutes = express.Router()

orderRoutes.use(verifyIsLoggedIn)
orderRoutes.get('/getOrder', getOrder)
orderRoutes.get('/getOrder/:id', getOrderDetails)

module.exports = orderRoutes