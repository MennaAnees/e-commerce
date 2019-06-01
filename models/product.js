const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Sequelize.Model {
        static checkSalePrice(body) {
            if (Number(body.sale_price) > Number(body.regular_price))
                return false;
            else
                return true;
        }

        static checkSaleDate(body) {
            if (body.sale_price && (!body.date_on_sale_from || !body.date_on_sale_to))
                return false;
            else
                return true;
        }

        static updateProduct(id, body) {
            return Product.update(
                body,
                { where: { id: id } }
            ).then(() => {
                return Product.findOne({ id: id })
            }
            ).then((result) => {
                if (result)
                    return result.dataValues;
            })
        }

        static deleteProduct(id) {
            return Product.destroy(
                { where: { id: id } }
            ).then((data) => {                
                return data
            })
        }
    }
    Product.init({
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        slug: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING, allowNull: false },
        regular_price: { type: DataTypes.INTEGER, allowNull: false },
        sale_price: { type: DataTypes.INTEGER },
        date_on_sale_from: { type: DataTypes.DATE },
        date_on_sale_to: { type: DataTypes.DATE },
        manage_stock: { type: DataTypes.BOOLEAN, defaultValue: false },
        stock_quantity: { type: DataTypes.INTEGER },
        sku: { type: DataTypes.STRING, unique: true }
    }, { sequelize });
    return Product;
};