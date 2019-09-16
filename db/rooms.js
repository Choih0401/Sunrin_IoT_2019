const database = require("./initsequelize")
const sequelize = require("sequelize")

const Room = database.define('room', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
    },
    name: sequelize.STRING,
    no: sequelize.NUMBER,
    otp: sequelize.STRING
});

Room.sync()

module.exports = Room