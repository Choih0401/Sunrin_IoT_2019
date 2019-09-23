const database = require("./initsequelize")
const sequelize = require("sequelize")

const Log = database.define('log', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
    },
    time: { type: sequelize.DATE, defaultValue: sequelize.NOW },
    msg: sequelize.STRING,
    type: sequelize.STRING
});

Log.sync()

module.exports = Log