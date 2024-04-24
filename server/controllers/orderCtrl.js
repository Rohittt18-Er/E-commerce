
const Order = require("../model/OrderModel");
const { sendResponse } = require("../utils/common");
const { responseStatus } = require("../utils/constants");




const getOrder = async (req, res) => {
    try {
        const id = req.user.userId
        const orderData = await Order.find({ user: id })
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(orderData, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_400)
            .send(sendResponse(null, true, error.message))
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const id = req.params.id
        const orderDetails = await Order.findOne({ _id: id })
        if (!orderDetails) {
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "Order not found"))
        }
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(orderDetails, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_400)
            .send(sendResponse(null, true, error.message))
    }
}


module.exports = { getOrder, getOrderDetails }