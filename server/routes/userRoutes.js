const express = require('express')
const { getUser, registerUser, loginUser, upDateUserProfile, writeReview, getUserProfile, getAdminUser, updateAdminUser, deleteAdminUser } = require('../controllers/userCtrl')
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')


const userRoutes = express.Router()

userRoutes.get("/", getUser)

userRoutes.post("/register", registerUser)

userRoutes.post('/login', loginUser)

userRoutes.use(verifyIsLoggedIn) ||
    userRoutes.use(verifyIsAdmin)
userRoutes.put('/userProfile', upDateUserProfile)
userRoutes.get('/getUserProfile', getUserProfile)
userRoutes.post('/writeReview/:id', writeReview)


userRoutes.use(verifyIsLoggedIn) && userRoutes.use(verifyIsAdmin)
userRoutes.get("/getAdminUser/:id", getAdminUser)
userRoutes.put("/updateAdminUser/:id", updateAdminUser)
userRoutes.delete("/deleteAdminUser/:id", deleteAdminUser)


module.exports = userRoutes