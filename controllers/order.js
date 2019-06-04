const express = require("express");
const router = express.Router();
const { Order, Cart } = require('../models');
const config = require('./../config');

router.post("/:userId", async (req, res) => {
    const { body, params: { userId } } = req;
    try {
        const userCart = await Cart.findUserCart(userId);
        if (!userCart.length)
            throw new Error('Your Cart Is Empty');

        const isValidOrder = await Order.validateOrder(userCart);
        if (!isValidOrder.valid)
            throw new Error(isValidOrder.errors);

        const order = {
            ...body,
            status: 'pending'
        };
        await Order.createOrder(order, userCart, userId);

        res
            .send({
                status: config.success,
                data: 'order created'
            });

    } catch (error) {
        res
            .status(config.fail)
            .json({
                status: config.fail,
                error: error.message
            })
    }

});

router.put("/:orderId/status", async (req, res) => {
        
    const { body : {status }, params: { orderId } } = req;
    try {
        const order = await Order.updateOrder(orderId, status);

        if (!order)
            throw new Error("Fail to update order");

        res.send({
            status: config.success,
            data: order
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
