import express from 'express';
import sequelize from "./API/Config/database.js";
import routes from './API/Routes/index.js';
require('dotenv/config.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log("Database synced successfully.");
}).catch((err) => {
    console.error("Error syncing database:", err);
});

app.get('/user/login', routes.userAuth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:5000");
});