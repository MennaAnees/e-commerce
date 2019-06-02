const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Cart extends Sequelize.Model {
        static findCart(id) {
            return Cart.findOne(
                { id: id }       
            ).then((data) => {
                return data
            })
        }

        static updateCart(userId, cartId, count) {
            return Cart.update(
                { count: count },
                {
                    where: {
                        id: cartId,
                        userId: userId
                    }
                }
            ).then(() => {
                return Cart.findOne({ id: cartId })
            }
            ).then((result) => {                
                if (result)
                    return result.dataValues;
            })
        }

        static deleteCart(id) {
            return Cart.destroy(
                { where: { id: id } }
            ).then((data) => {                
                return data
            })
        }
    }
    Cart.init({
        count: { type: DataTypes.INTEGER, defaultValue: 1 },
        userId: { type: DataTypes.STRING, allowNull: false },
        productId: { type: DataTypes.STRING, allowNull: false },
    }, { sequelize });

    return Cart;
};