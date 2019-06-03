require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./models/');
sequelize.sync({ force: true });

const productController = require('./controllers/product');
const cartController = require('./controllers/cart');
const orderController = require('./controllers/order');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/product', productController);
app.use('/user', cartController);
app.use('/order', orderController);



app.listen(3000, () => {
    console.log("app is listening on port 3000");
});