import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import User from './../models/User.js';

export default async function isAuthenticated(req, res, next) {
    try {
        const secretKey = process.env.SECRET_KEY;
        const token = req.cookies.token;
        console.log(token);

        if (token) {
            const user = await User.findOne({ where: { token: token } }); // Replace with DB query
            console.log(user.name);
            if (!user) return res.redirect("/login");

            // Verify JWT
            jwt.verify(token, process.env.SECRET_KEY, (err, decodedUser) => {
                if (err) return res.redirect("/login");
                req.user = decodedUser;
                next();
            });
            console.log("authentication successful");
        }
        else {
            console.log("Invalid user.");
        }
    }
    catch (err) {
        console.log("Something went wrong");
    }
}
