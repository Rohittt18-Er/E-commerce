const Product = require("../model/ProductModel");
const Review = require("../model/reviewModel");
const { sendResponse } = require("../utils/common");
const { responseStatus } = require("../utils/constants");
const fs = require('fs')
const path = require('path')

const getProductCtrl = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Number(req.query.limit) || 50;
        const startIndex = (page - 1) * limit;

        //for Sorting   
        let sort = {}
        if (req.query.sort) {
            const sortOption = req.query.sort
            let data = sortOption.split("_")
            sort = {
                [data[0]]: data[1]
            }
        }

        // searching By query
        let queryCondition = false
        let query = {}
        let queryOption = req.query.price
        let priceQuery = {}
        let ratingQuery = {}
        let categoryNameParams = {}
        let categoryNameQuery = {}
        let attrs = []

        // query for Price

        if (req.query.price) {
            let data1 = queryOption.split('-')
            queryCondition = true
            priceQuery = {
                price: { $lte: data1[1], $gte: data1[0] }
            }
        }
        // query for rating

        if (req.query.rating) {
            let data = req.query.rating.split(",")
            queryCondition = true
            ratingQuery = {
                rating: { $in: data }
            }
        }

        // params for CategoryName

        if (req.params.categoryName) {
            let categoryName = req.params.categoryName
            if (categoryName) {
                queryCondition = true
                categoryNameParams = {
                    category: categoryName
                }
            }
        }

        // query for CategoryName

        if (req.query.categoryName) {
            let data = req.query.categoryName.split(",")
            queryCondition = true
            categoryNameQuery = {
                category: {
                    $in: data
                }
            }
        }

        // query for attributes
        if (req.query.attrs) {
            let data = req.query.attrs
            queryCondition = true
            let data2 = data.split(',')
            attrs = data2.reduce((acc, item) => {
                if (item) {
                    let a = item.split('-')
                    let values = [...a]
                    values.shift()
                    let data3 = {
                        attrs: {
                            $elemMatch: { key: a[0], value: { $in: values } }
                        }
                    }
                    acc.push(data3)
                    return acc
                }
            }, [])
        }
        let searchQuery = {};
        // params for seachProduct        
        if (req.params.searchQuery) {

            let searchItem = req.params.searchQuery
            searchQuery = {
                $text: { $search: searchItem }
            }
            queryCondition = true
        }
        if (queryCondition) {
            query = {
                $and: [priceQuery, ratingQuery, categoryNameParams, categoryNameQuery, ...attrs, searchQuery]
            }
        }
        const product = await Product.find(query).sort(sort).skip(startIndex)
            .limit(page === 0 ? 0 : limit);

        const totalItems = await Product.countDocuments(query);
        if (!product) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, "NODATAFOUND"));
        }
        const finalData = { totalItems, product }
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(finalData, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id
        const productData = await Product.findById(id).populate("reviews").orFail()
        if (!productData) {
            return res
                .status(responseStatus.code_500)
                .send(sendResponse(null, true, "NODATAFOUND"));
        }
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(productData, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const getBestSellers = async (req, res) => {
    try {
        const productData = await Product.aggregate([
            { $sort: { sales: -1 } },
            { $project: { _id: 1, name: 1, image: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ])
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(productData, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const getAdminProduct = async (req, res) => {
    try {
        const getProduct = await Product.find({}).sort({ category: 1 }).select("name price category")
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(getProduct, false, "SUCCESS"));

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.findByIdAndDelete(id)
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(null, false, "Product deleted successfully"));

    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const createProduct = async (req, res) => {
    try {

        const { name, description, count, price, category, attributesTable } = req.body
        const product = new Product()
        product.name = name,
            product.category = category,
            product.description = description,
            product.count = count,
            product.price = price
        if (product.attrs.length === 0) {
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        }
        await product.save()
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(product, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { name, description, count, price, category, attributesTable } = req.body
        const product = await Product.findById(id)
        if (product) {
            product.name = name || product.name,
                product.category = category || product.category,
                product.price = price || product.price,
                product.description = description || product.description,
                product.count = count || product.count
            if (attributesTable.length > 0) {
                product.attrs = []
                attributesTable.map((item) => {
                    product.attrs.push(item)
                })
            } else {
                product.attrs = []
            }
            await product.save()
            return res
                .status(responseStatus.code_200)
                .send(sendResponse(product, false, "SUCCESS"));
        }
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const uploadImage = async (req, res) => {
    try {
        const files = req.files;
        if (!files) {
            return res
                .status(responseStatus.code_400)
                .send(sendResponse(null, true, "BAD_REQUEST"));
        }
        let product = await Product.findById(req.params.productId).orFail()
        files.map((cv) => {
            product.images.push({
                path: "images/products/" + cv.filename,
            })
        })
        await product.save()
        return res
            .status(responseStatus.code_200)
            .send(sendResponse(product, false, "SUCCESS"));
    } catch (error) {
        return res
            .status(responseStatus.code_500)
            .send(sendResponse(null, true, error.message));
    }
}

const deleteImageFromProduct = async (productId, imagePath) => {
    try {
        let product = await Product.findById(productId).orFail();
        product.images = product.images.filter(image => image.path !== imagePath);
        await product.save();
        console.log('Image deleted from product successfully');
    } catch (error) {
        console.error('Error deleting image from product:', error);
        throw error;
    }
};

const deleteImageAPI = async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteImageFromProduct(productId, imagePath);
        return res.status(responseStatus.code_200).send(sendResponse(null, false, 'Image deleted successfully'));
    } catch (error) {
        return res.status(responseStatus.code_500).send(sendResponse(null, true, error.message));
    }
};








module.exports = { uploadImage, getProductCtrl, getSingleProduct, getBestSellers, getAdminProduct, deleteProduct, createProduct, updateProduct, deleteImageAPI }