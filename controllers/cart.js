const express = require("express");
const router = express.Router();
const { Cart, Product } = require('../models');
const config = require('./../config');

router.post("/:id/cart/", async (req, res) => {
    const { body } = req;
    try {

        const validProduct = await Product.findProduct(body.productId);

        if (!validProduct)
            throw 'Please add a valid product';

        const addedCart = await Cart.create(body);

        res.send({
            status: config.success,
            data: addedCart
        });
    } catch (error) {

        res.send({
            status: config.fail,
            errorr: error || "fail to add to cart"
        })
    }

});

router.put("/:userId/cart/:cartId", async (req, res) => {
    const count = req.body.count;
    const userId = req.params.userId;
    const cartId = req.params.cartId;

    try {

        const cart = await Cart.updateCart(userId, cartId, count);
        
        if (!cart)
            throw "Fail to update cart"

        res.send({
            status: config.success,
            data: cart
        });
    } catch (error) {
        
        res.send({
            status: config.fail,
            errorr: error || "fail to update product"
        })
    }
});

router.delete("/:userId/cart/:cartId", async (req, res) => { 
   
    const cartId = req.params.cartId
    try {

        const cart = await Cart.deleteCart(cartId);
        
        if (!cart)
            throw "Fail to delete cart"

        res.send({
            status: config.success,
            data: "Cart is deleted successFully"
        });
    } catch (error) {        
        res.send({
            status: config.fail,
            errorr: error || "fail to delete cart"
        })
    }
});

router.get("/:id/cart/:cartId", async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const cart = await Cart.findCart(cartId);
        
        if(!cart)
            throw 'Fail to find cart';

        res.send({
            status: config.success,
            data: cart
        });
    } catch (error) {
        
        res.send({
            status: config.fail,
            errorr: error
        })
    }
});

module.exports = router;
