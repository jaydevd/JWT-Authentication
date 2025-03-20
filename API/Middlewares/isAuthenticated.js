/**
 * @name userAuthentication
 * @file isAuthenticated.js
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 * @throwsF
 * @description This file will import all middlewares.
 * @author Jaydev Dwivedi (Zignuts)
 */

import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export default async function isAuthenticated(req, res, next) {

    try {
        const secretKey = process.env.SECRET_KEY;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {

            // Verify JWT
            const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

            if (!verifyToken) {
                res.json({
                    status: '400',
                    message: '',
                    error: 'Invalid Token',
                    data: ''
                })
            }

            const user = await User.findOne({
                where: { token: token, id: id },
                attributes: ['name', 'email']
            });

            if (!user) {
                res.json({
                    status: '400',
                    message: '',
                    error: 'No user found',
                    data: ''
                });
            }

            if (token === user.token) {
                res.json({
                    status: '200',
                    message: 'User found',
                    error: '',
                    data: ''
                });
            }
            else {
                res.json({
                    status: '400',
                    message: '',
                    error: 'some error occurred',
                    data: ''
                });
            }


            if (user.isActive) {
                req.user = user;
                next();
            }
            else {
                if (!user) res.json({
                    status: '400',
                    message: '',
                    error: 'some error occurred',
                    data: ''
                });
            }
            next();
        }
        else {
            console.log("Invalid user.");
        }
    }
    catch (err) {
        console.log("Something went wrong");
    }
}