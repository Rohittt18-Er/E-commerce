const Category = require("../model/CategoryModel");
const { sendResponse } = require("../utils/common");
const { responseStatus } = require("../utils/constants");


const getCategory = async (req, res, next) => {
    try {
        const categoryData = await Category.find({ isDeleted: false }).sort({ name: "asc" })
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(categoryData, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const categoryFound = await Category.findOne({ name: name })

        if (categoryFound) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, error.message));
        } else {
            const newData = await Category.create({
                name: name,
                description: description
            })
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(newData, false, "SUCCESS"));
        }
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);
        const categoryData = await Category.findById({ _id: id })
        if (!categoryData) {
            return res
                .status(responseStatus.code_200)
                .send(sendResponse(null, true, "NODATAFOUND"));
        } else {
            categoryData.isDeleted = true
            await categoryData.save()
            return res
                .status(responseStatus.code_200)
                .send(sendResponse(categoryData, false, "SUCCESS"));
        }

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const addAttributes = async (req, res) => {
    try {
        const { key, value, categoryChoosen } = req.body
        const category = categoryChoosen.split('/')[0]
        const categoryExist = await Category.findOne({ name: category })

        if (!categoryExist) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, "NODATAFOUND"));
        }
        if (categoryExist.attrs.length > 0) {
            let keyDoesNotExist = true
            categoryExist.attrs.map((cv, idx) => {
                if (cv.key === key) {
                    keyDoesNotExist = false
                    let data = [...categoryExist.attrs[idx].value]
                    data.push(value)
                    newData = [...new Set(data)]
                    categoryExist.attrs[idx].value = newData
                }
            })
            if (keyDoesNotExist) {
                categoryExist.attrs.push({ key: key, value: value })
            }
        } else {
            categoryExist.attrs.push({ key: key, value: value })
        }
        await categoryExist.save()

        return res
            .status(responseStatus.code_200)
            .send(sendResponse(categoryExist, false, "SUCCESS"));

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

module.exports = { getCategory, addCategory, deleteCategory, addAttributes }