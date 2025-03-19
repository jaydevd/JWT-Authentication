import bcrypt from 'bcrypt';
import 'dotenv/config.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import sequelize from "./src/database/db-config.js";
import isAuthenticated from './src/middlewares/isAuthenticated.js';
import User from "./src/models/User.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log("Database synced successfully.");
}).catch((err) => {
    console.error("Error syncing database:", err);
});

app.get("/", (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {

    try {
        const verifyEmail = await req.body.email;
        const verifyPassword = await req.body.password;

        console.log(verifyEmail, verifyPassword);

        const user = await User.findOne({
            where: { email: verifyEmail },
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!user) res.json("User not found");
        console.log("User: ", user.password);

        const isMatch = await bcrypt.compare(verifyPassword, user.password);

        console.log('Comparison completed: ', isMatch);

        if (isMatch) {
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, secretKey, { expiresIn: '1h' });
            console.log(token);

            const result = await User.update(
                { token: token },
                {
                    where: {
                        id: user.id,
                    },
                },
            );
            console.log(result);
            res.cookie('token', token);
            res.redirect(`/profile?token=${token}`);
        }
        else {
            res.json("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
    }

})

app.get('/profile', isAuthenticated, async (req, res) => {

    try {
        const token = req.cookies.token;
        const user = await User.findOne({ where: { token: token } });
        console.log("profile: ", user.name);
        res.render('profile', { id: user.id, name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
    }
});

app.get('/logout', async (req, res) => {

    try {
        // const token = req.query.token;
        const token = req.cookies.token;

        if (!token) console.log("error");
        const user = User.findOne({ where: { token: token } });
        user.token = null;

        res.clearCookie("token");
        res.redirect('/');

    } catch (error) {
        console.log("Something went wrong");
    }
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:5000");
});