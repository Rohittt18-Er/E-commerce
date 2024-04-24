const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const verifyIsLoggedIn = (req, res, next) => {
    try {
        const token = req.header("authorization");
        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (err) {
            return res.status(401).send("Unauthorized. Invalid Token")
        }

    } catch (err) {
        next(err)
    }
}

const verifyIsAdmin = async (req, res, next) => {
    const userFound = await User.findOne({ _id: req.user.userId })

    if (req.user && userFound.isAdmin) {
        next()
    } else {
        return res.status(401).send("Unauthorized. Admin required")
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin }
