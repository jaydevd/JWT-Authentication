/**
 * @name sequelize
 * @file database.js
 * @throwsF
 * @description This file will configure database.
 * @author Jaydev Dwivedi (Zignuts)
 */

import { Sequelize } from "sequelize";
import { DB_DIALECT } from "./constants";

const sequelizePost = new Sequelize(process.env.DB_NAME, process.env.DB_ADMIN, process.env.DB_ADMIN_PASSWORD, {
    host: process.env.DB_HOST_NAME,
    PORT: process.env.DB_PORT,
    dialect: DB_DIALECT,
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

export default sequelize;