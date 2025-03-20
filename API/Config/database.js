/**
 * @name sequelize
 * @file database.js
 * @throwsF
 * @description This file will configure database.
 * @author Jaydev Dwivedi (Zignuts)
 */

// import { Sequelize } from "sequelize";
// import { DB_DIALECT } from "./constants";
const { Sequelize } = require("sequelize");
const { DB_DIALECT } = require("./constants");

const sequelize = new Sequelize('UserAuth', process.env.DB_ADMIN, process.env.DB_ADMIN_PASSWORD, {
    host: process.env.DB_HOST_NAME,
    PORT: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = sequelize;