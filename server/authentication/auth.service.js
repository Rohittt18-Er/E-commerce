// Internal Imports
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const compose = require('composable-middleware');
const { sendResponse } = require("../utils/common");


// Mongoose models
const User = require('../model/userModel');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
let isAuthenticated = () => {
    return compose()
        // Validate jwt
        .use((req, res, next) => {

            const token = req.header("authorization");
            if (!token) return res.status(401).send(sendResponse(null, true, "EMPTYTOKEN"));

            // To validate jwt token
            req.user = verifyToken(token, res);
            console.log(req.user);
            next();

        })
        // Attach user to request
        .use(async (req, res, next) => {
            try {
                // To get user by id
                let existingUser = await User.findById(req.user._id);
                // 
                if (!existingUser) {
                    return res.status(401).send(sendResponse(null, true, "TOKENEXPIRE"));
                }

                // Attaching user to request
                req.user = existingUser;
                next();
            } catch (error) {
                next(error);
            }
        });
}



/**
 * Returns decode date stored in token after verification
 */
let verifyToken = (token, res) => {
    try {
        // To verify jwt token
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(400).send(sendResponse(null, true, "TOKENEXPIRE"));
    }
}
/**
 * Set token cookie directly for oAuth strategies
 */
// let setTokenCookie = (req, res) => {
//     if (!req.user)
//         return res.status(404).json({ message: 'Something went wrong, please try again.' });
//     let token = signToken(req.user._id, req.user.role);
//     res.cookie('token', JSON.stringify(token));
// }

module.exports = {
    isAuthenticated,

}