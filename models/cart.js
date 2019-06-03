const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Cart extends Sequelize.Model {
    
        static findUserCart(userId) {
            return Cart.findAll(
                {
                    userId: userId
                }
            ).then((data) => {
                if (data)
                    return data
            })
        }

        static updateCart(userId, productId, count) {
            return Cart.update(
                { count: count },
                {
                    where: {
                        id: productId,
                        userId: userId
                    }
                }
            ).then(() => {
                return Cart.findOne({ where: { id: productId } })
            }
            ).then((result) => {
                if (result)
                    return result.dataValues;
            })
        }

        static deleteCart(id , userId) {
            return Cart.destroy(
                {
                    where:
                    {   
                        id : id,
                        userId: userId,
                    }
                }
            ).then((data) => {
                return data
            })
        }
    }
    Cart.init({
        count: { type: DataTypes.INTEGER, defaultValue: 1 },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        productId: { type: DataTypes.INTEGER, allowNull: false },
    }, { sequelize });

    return Cart;
};