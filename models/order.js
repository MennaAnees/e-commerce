const Sequelize = require("sequelize");
const { Op } = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Order extends Sequelize.Model {
    static async validateOrder(userCart) {

      const productIds = userCart.map(product => +product.productId);

      const products = await sequelize.models.Product.findAll({
        where: { id: { [Op.or]: productIds } }
      });

      const unAvailableProducts = products.filter(product => {
        const requestedProduct = userCart.find(
          p => +p.productId === product.id
        );
        return product.stock_quantity < requestedProduct.count;
      });

      return {
        valid: !unAvailableProducts.length,
        errors: unAvailableProducts.map(p => ({
          message: `${p.name} is not available`
        }))
      };
    }

    static async createOrder(order, userCart, userId) {
      const {
        models: { Order, Product, Cart, OrderItems }
      } = sequelize;
      const t = await sequelize.transaction();
      try {
        const createdOrder = await Order.create(order, { transaction: t });
        const orderItems = userCart.map(item => ({
          product_id: item.productId,
          order_id: createdOrder.id,
          count: item.count
        }));
        await OrderItems.bulkCreate(orderItems, { transaction: t });
        await Cart.destroy({ where: { userId }, transaction: t });

        const decrementProms = userCart.map(item => {
          return Product.findByPk(item.productId).then(product => {
            if (product.stock_quantity < item.count) {
              throw new Error(`${product.name} is not available`);
            }
            product.decrement("stock_quantity", { by: item.count, transaction: t });
          });
        });

        await Promise.all(decrementProms);
        return t.commit();
      } catch (error) {

        t.rollback();
        throw error;
      }

    }

    static updateOrder(id, status) {
      return Order.update(
        { status: status },
        {
          where: { id: id }
        }
      ).then(() => {
        return Order.findOne({ where: { id: id } })
      }
      ).then((result) => {
        if (result)
          return result.dataValues;
      })
    }

    static async findProducts(orderId) {
      var productIds = [];
      await sequelize.models.OrderItems.findAll(
        {
          where: { order_id: orderId },
          include: [
            {
              model: sequelize.models.Order,
              as: 'orders'
            },
            {
              model: sequelize.models.Product,
              as: 'products'
            }
          ],
        }
      ).then((data) => {
        return productIds = data.map(orderItem => +orderItem.product_id);
      });
      var products = await sequelize.models.Product.findAll({
        where: { id: { [Op.or]: productIds } }
      });
      if (products)
        return products.map(product => product.dataValues)

    }

  }


  Order.init(
    {
      status: {
        type: DataTypes.ENUM([
          "pending",
          "confirmed",
          "shipping",
          "completed",
          "cancelled",
          "refunded",
          "failed"
        ]),
        allowNull: false
      },
      currency: { type: DataTypes.STRING, allowNull: false },
      customer_note: { type: DataTypes.TEXT },
      store_note: { type: DataTypes.TEXT },
      customer_details: { type: DataTypes.JSON, allowNull: false },
      shipping_address: { type: DataTypes.JSON, allowNull: false },
      payment_method: {
        type: DataTypes.ENUM(["COD", "CREDIT"]),
        allowNull: false
      },
      userId: { type: DataTypes.INTEGER }
    },
    { sequelize }
  );
  return Order;
};