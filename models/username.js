const {DataTypes} = require("sequelize");
const db=require("../db");

const Username = db.define("username", {
    username:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    passwordhash: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Username;