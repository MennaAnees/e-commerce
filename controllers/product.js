const express = require("express");
const router = express.Router();
const { Product } = require('../models');
const config = require('./../config');

router.post("/add", async (req, res) => {
    const { body } = req;
    try {
        const validSalesPrice = Product.checkSalePrice(body);
        if (!validSalesPrice)
            throw 'Sale price should be less than regular price';

        const validSalesDate = Product.checkSaleDate(body);
        if (!validSalesDate)
            throw 'Please enter valid sale date';

        const addedProduct = await Product.create(body);

        res.send({
            status: config.success,
            data: addedProduct
        });
    } catch (error) {

        res.send({
            status: config.fail,
            errorr: "fail to add poduct"
        })
    }

});

router.put("/:id", async (req, res) => {
    const { body } = req;
    const id = req.params.id;

    try {
        const validSalesPrice = Product.checkSalePrice(body);
        if (!validSalesPrice)
            throw 'Sale price should be less than regular price';

        const validSalesDate = Product.checkSaleDate(body);
        if (!validSalesDate)
            throw 'Please enter valid sale date';

        const product = await Product.updateProduct(id, body);

        if (!product)
            throw "Fail to update product"

        res.send({
            status: config.success,
            data: product
        });
    } catch (error) {
        res.send({
            status: config.fail,
            errorr: error || "fail to update product"
        })
    }
});

router.delete("/:id", async (req, res) => { 
    const { body } = req;
    const id = req.params.id;

    try {
      
        const product = await Product.deleteProduct(id, body);

        if (!product)
            throw "Fail to delete product"

        res.send({
            status: config.success,
            data: "Product is deleted successFully"
        });
    } catch (error) {
        res.send({
            status: config.fail,
            errorr: error || "fail to delete product"
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();

        res.send({
            status: config.success,
            data: products
        });
    } catch (error) {

        res.send({
            status: config.fail,
            errorr: error
        })
    }
});

module.exports = router;
