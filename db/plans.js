const database = require("./initsequelize")
const sequelize = require("sequelize")

var Plan = database.define('plan', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
    },
    classnum: sequelize.NUMBER,
    roomnum: sequelize.NUMBER,
    startTime: sequelize.TIME,
    endTime: sequelize.TIME
});

Plan.sync()

module.exports = Plan