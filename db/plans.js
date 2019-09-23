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
    startTime: sequelize.DATE,
    endTime: sequelize.DATE
});

Plan.sync()

module.exports = Plan