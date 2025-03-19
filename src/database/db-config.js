const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("UserAuth", "ztlab78", "", {
    host: "localhost", // Change to your PostgreSQL host
    dialect: "postgres",
    logging: false, // Set to true to log SQL queries
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

module.exports = sequelize;