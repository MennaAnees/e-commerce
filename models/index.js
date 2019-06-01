const Sequelize = require('sequelize');
const PG_URL = process.env.PG_URL || 'postgres://dbuser:12345@localhost:5432/e-commerce';

//open connection w postgres
const sequelize = new Sequelize(PG_URL);

// get model
const Product = sequelize.import('./product');

//create table in db
const init = async () => {
    await Product.sync({ force: true });
}
init();


module.exports = {
    Product,
    sequelize
};