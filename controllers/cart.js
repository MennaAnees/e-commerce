const express = require("express");
const router = express.Router();
const { Cart, Product } = require('../models');
const config = require('./../config');

router.post("/:userId/cart", async (req, res) => {
    const { body: { productId, count }, params: { userId } } = req;

    try {
        const validProduct = await Product.findProduct(productId, count);

        if (!validProduct)
            throw new Error('Please add a valid product');

        const addedCart = await Cart.create({
            productId,
            count,
            userId
        });

        res.send({
            status: config.success,
            data: addedCart
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

router.put("/:userId/cart/:productId", async (req, res) => {
    const { body: { count }, params: { userId, productId } } = req;

    try {
        const cart = await Cart.updateCart(userId, productId, count);

        if (!cart)
            throw new Error("Fail to update cart")

        res.send({
            status: config.success,
            data: cart
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

router.delete("/:userId/cart", async (req, res) => {
    const { params: { userId } } = req;

    try {
        const cart = await Cart.deleteCart(userId);

        if (!cart)
            throw new Error("Fail to delete cart")

        res.send({
            status: config.success,
            data: "Cart is deleted successFully"
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

router.get("/:userId/cart/", async (req, res) => {
    const { body: { userId } } = req;


    try {
        const cart = await Cart.findUserCart(userId);

        if (!cart)
            throw new Error('Fail to find cart');

        res.send({
            status: config.success,
            data: cart
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

module.exports = router;
