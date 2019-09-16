const database = require("./initsequelize")
const sequelize = require("sequelize")

var User = database.define('user', {
    id: {
        primaryKey: true,
        type: sequelize.INTEGER,
        autoIncrement: true
    },
    username: sequelize.STRING,
    password: sequelize.STRING,
    classnum: sequelize.NUMBER,
    studentnum: sequelize.NUMBER,
    name: sequelize.STRING
});

User.sync()

module.exports = User