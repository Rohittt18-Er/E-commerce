require("dotenv").config();

const Product = require("../model/ProductModel");
const Review = require("../model/reviewModel");
const User = require("../model/userModel");
const { sendResponse } = require("../utils/common");
const { responseStatus } = require("../utils/constants");
const generateToken = require("../utils/generateToken");


const getUser = async (req, res) => {
    try {
        const userDetails = await User.find({})
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(userDetails, false, "SUCCESS"));

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, lastName, email, password } = req.body
        const userFound = await User.findOne({ email: email })
        if (userFound) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, "User already Exist"));
        }
        const userData = await User.create({
            name, lastName, email, password
        })
        return res
            .cookie('access_token', generateToken(userData._id), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
            .status(responseStatus.code_200)
            .send(sendResponse(userData, false, "SUCCESS"));

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, donotLogOut } = req.body
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, "User Not Found"));
        }
        if (userFound && (await userFound.matchPassword(password)) && donotLogOut) {
            return res
                .cookie('access_token', generateToken(userFound._id), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(responseStatus.code_200)
                .send(sendResponse(userFound, false, "User Login successful"));
        } else if (userFound && (await userFound.matchPassword(password)) && !donotLogOut) {
            return res
                .cookie('access_token', generateToken(userFound._id, donotLogOut), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict"
                })
                .status(responseStatus.code_200)
                .send(sendResponse(userFound, false, "User Login successful"));
        }

    } catch (error) {

    }
}

const upDateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId
        const { name, lastName, email, phoneNumber, address, country, zipCode, city, state } = req.body
        const userFound = await User.findOne({ _id: userId })
        userFound.name = name || userFound.name
        userFound.lastName = lastName || userFound.lastName
        userFound.email = email || userFound.email
        userFound.phoneNumber = phoneNumber || userFound.phoneNumber
        userFound.address = address || userFound.address
        userFound.country = country || userFound.country
        userFound.zipCode = zipCode || userFound.zipCode
        userFound.city = city || userFound.city
        userFound.state = state || userFound.state
        await userFound.save()
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(userFound, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const getUserProfile = async (req, res) => {
    try {
        const id = req.user.userId
        const userFound = await User.findOne({ _id: id })
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(userFound, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const writeReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const session = await Review.startSession();
        if (!(comment && rating)) {
            return res.status(400).send("All inputs are required");
        }

        const ObjectId = require("mongodb").ObjectId;
        let reviewId = new ObjectId();

        const userFound = await User.findOne({ _id: req.user.userId })

        session.startTransaction();
        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user.userId, name: userFound.name },
            }
        ], { session: session })

        const product = await Product.findById(req.params.id).populate("reviews").session(session);

        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user.userId.toString());
        if (alreadyReviewed) {
            await session.abortTransaction();
            session.endSession();
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "Review alredy created"));
        }
        let prc = [...product.reviews];
        prc.push({ rating: rating });
        product.reviews.push(reviewId);
        if (product.reviews.length === 1) {
            product.rating = Number(rating);
            product.reviewsNumber = 1;
        } else {
            product.reviewsNumber = product.reviews.length;
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum, item) => sum + item, 0) / product.reviews.length;
        }
        await product.save();
        await session.commitTransaction();
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(null, false, "SUCCESS"));
    } catch (error) {

        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const getAdminUser = async (req, res) => {
    try {
        const id = req.params.id
        const userFound = await User.findOne({ _id: id })
        if (!userFound) {
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "User not found"))
        }
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(userFound, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_400)
            .send(sendResponse(null, true, error.message))
    }
}

const updateAdminUser = async (req, res) => {
    try {
        const id = req.params.id
        const userFound = await User.findOne({ _id: id })
        if (!userFound) {
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "User not found"))
        }
        const { name, lastName, email, isAdmin } = req.body
        userFound.name = name || userFound.name
        userFound.lastName = lastName || userFound.lastName
        userFound.email = email || userFound.email
        userFound.isAdmin = isAdmin || userFound.isAdmin
        await userFound.save()
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(userFound, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_400)
            .send(sendResponse(null, true, error.message))
    }
}

const deleteAdminUser = async (req, res) => {
    try {
        const id = req.params.id
        const userFound = await User.findByIdAndDelete({ _id: id })
        if (!userFound) {
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "User not found"))
        }
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(null, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_400)
            .send(sendResponse(null, true, error.message))
    }
}


module.exports = { getUser, registerUser, loginUser, upDateUserProfile, getUserProfile, writeReview, getAdminUser, updateAdminUser, deleteAdminUser }