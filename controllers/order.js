const express = require("express");
const router = express.Router();
const { Order, Cart, OrderItems, Product } = require('../models');
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
            userId: userId,
            status: 'pending'
        };
        await Order.createOrder(order, userCart, userId);

        res
            .send({
                status: config.success,
                data: "Order Created SuccessFully"
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
    debugger;

    const { body: { status }, params: { orderId } } = req;
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

router.get("/:orderId/user/:userId", async (req, res) => {
    const { params: { orderId, userId } } = req;
    try {
        const order = await Order.findOne(
            {
                where: { id: orderId, userId: userId }
            });
        if (!order)
            throw new Error("Fail to view order");

        const products = await Order.findProducts(orderId)
        if (!products)
            throw new Error("Fail to view the order");


        res.send({
            status: config.success,
            order: order,
            items: products
        });
    } catch (error) {
        res
            .status(config.fail)
            .send({
                status: config.fail,
                error: error
            })
    }
});

module.exports = router;
