const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderItems extends Sequelize.Model {
        static addOrderItem(productId, orderId) {
            return OrderItems.create({
                productId: productId,
                orderId: orderId,
                count: 0
            }).then((data) => {                
                return data;
            });
        }
    }

    OrderItems.init({
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        order_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER },
    }, { sequelize });


    return OrderItems;
};