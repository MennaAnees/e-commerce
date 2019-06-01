require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./models/');

const productController = require('./controllers/product');


// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/product', productController);

app.listen(3000,()=>{
    console.log("app is listening on port 3000");    
});