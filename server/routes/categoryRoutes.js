const express = require('express')
const { verifyIsAdmin, verifyIsLoggedIn } = require("../middleware/verifyAuthToken");
const { getCategory, addCategory, deleteCategory, addAttributes } = require('../controllers/categoryCtrl')

const categoryRoutes = express.Router()


categoryRoutes.use(verifyIsLoggedIn)

categoryRoutes.use(verifyIsAdmin)
categoryRoutes.get('/', getCategory)
categoryRoutes.post('/', addCategory)
categoryRoutes.put('/:id', deleteCategory)
categoryRoutes.post("/attrs", addAttributes)
module.exports = categoryRoutes