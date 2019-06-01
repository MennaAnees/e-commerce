const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Sequelize.Model { }
    User.init({
        name: { type: DataTypes.STRING }
    }, { sequelize });
    return User;
};