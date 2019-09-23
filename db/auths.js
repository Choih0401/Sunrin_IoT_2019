const database = require("./initsequelize")
const sequelize = require("sequelize")

var Auth = database.define('plan', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
    },
    successTime: sequelize.DATE,
    roomnum: sequelize.NUMBER
});

Auth.sync()

module.exports = Auth