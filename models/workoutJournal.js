const { DataTypes} = require("sequelize");
const db = require("../db");

const workoutLog = db.define("workoutLog",{
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    definition:{
        type: DataTypes.STRING,
        allowNull: false
    },
    result:{
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = workoutLog;