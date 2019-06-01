const Sequelize = require('sequelize');
const PG_URL = process.env.PG_URL || 'postgres://dbuser:12345@localhost:5432/ecommerce';

//open connection w postgres
const sequelize = new Sequelize(PG_URL);

// get model
const Product = sequelize.import('./product');
const User = sequelize.import('./user');


//create table in db
// const init = async () => {
//     try{
//         await Product.sync({ force: true });
//         await User.sync({ force: true });
    
//         console.log("tables are saved!");
//     }catch(err){
//         console.log("*******************************");
//         console.log("err",err);
//         console.log("*******************************");

        
//     }

    
// }
// // init();

module.exports = {
    Product,
    User,
    sequelize
};