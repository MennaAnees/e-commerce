const Sequelize = require('sequelize');
const PG_URL = process.env.PG_URL || "postgres://dbuser:12345@localhost:5432/ecommerce"

//open connection w postgres
const sequelize = new Sequelize(PG_URL);

// get model
const Product = sequelize.import('./product');
const User = sequelize.import('./user');
const Cart = sequelize.import('./cart');
const Order = sequelize.import('./order');
const OrderItems = sequelize.import('./orderItems');

OrderItems.belongsTo(Product);
OrderItems.belongsTo(Order);

module.exports = {
    Product,
    User,
    Cart,
    Order,
    OrderItems,
    sequelize
};