const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:e512318ce1a644f4a2f96d9f0b23d9d0@localhost:5432/workoutLog");
module.exports = sequelize;