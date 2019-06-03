const express = require("express");
const router = express.Router();
const { Product } = require('../models');
const config = require('./../config');

router.post("/", async (req, res) => {
    const { body } = req;
    try {
        const validSalesPrice = Product.checkSalePrice(body);
        if (!validSalesPrice)
            throw new Error('Sale price should be less than regular price');

        const validSalesDate = Product.checkSaleDate(body);
        if (!validSalesDate)
            throw new Error('Please enter valid sale date');

        const addedProduct = await Product.create(body);
        if (!addedProduct)
            throw new Error("Fail to add product");

        res.send({
            status: config.success,
            data: addedProduct
        });
    } catch (error) {

        res
            .status(config.fail)
            .send({
                status: config.fail,
                errorr: error.message
            })
    }

});

router.put("/:id", async (req, res) => {
    const { body, params: { id } } = req;

    try {
        const validSalesPrice = Product.checkSalePrice(body);
        if (!validSalesPrice)
            throw new Error('Sale price should be less than regular price');

        const validSalesDate = Product.checkSaleDate(body);
        if (!validSalesDate)
            throw new Error('Please enter valid sale date');

        const product = await Product.updateProduct(id, body);

        if (!product)
            throw new Error("Fail to update product");

        res.send({
            status: config.success,
            data: product
        });
    } catch (error) {
        res
            .status(config.fail)
            .send({
                status: config.fail,
                errorr: error.message
            })
    }
});

router.delete("/:id", async (req, res) => {
    const { body } = req;
    const id = req.params.id;

    try {

        const product = await Product.deleteProduct(id, body);

        if (!product)
            throw new Error("Fail to delete product")

        res.send({
            status: config.success,
            data: "Product is deleted successFully"
        });
    } catch (error) {
        res
            .status(config.fail)
            .send({
                status: config.fail,
                error: error.message
            })
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();
        if (!products)
            throw new Error("Fail to list products");

        res.send({
            status: config.success,
            data: products
        });
    } catch (error) {

        res
            .status(config.fail)
            .send({
                status: config.fail,
                errorr: error
            })
    }
});

module.exports = router;
