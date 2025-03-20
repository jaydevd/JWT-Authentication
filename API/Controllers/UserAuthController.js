/**
 * @name signup/login/logout
 * @file AuthController.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description UserSignUp method will create a new user, UserLogIn method will log in an existing user and UserLogOut method will log out the logged in user.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { v4: uuidv4 } = require('uuid');
const Validator = require("validatorjs");
const bcrypt = require('bcrypt');
const { User } = require('./../Models/index');
const jwt = require('jsonwebtoken');

const UserSignUp = async (req, res) => {

    // console.log("API Called");
    try {
        const { name, email, password } = req.body;

        let validation = new Validator({
            name: name,
            email: email,
            password: password,
        },
            {
                name: 'required',
                email: 'required',
                password: 'required'
            }
        )

        if (validation.passes()) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const userId = await uuidv4();
            const result = await User.create({ id: userId, name: name, email: email, password: hashedPassword });

            res.json({
                status: '200',
                data: '',
                message: 'Data Created Successfully',
                error: ''
            })
        }

        if (validation.fails()) {
            return res.json({
                status: '400',
                data: '',
                message: 'Invalid Credentials',
                error: validation.errors.all()
            })
        }
    } catch (error) {
        console.log(error);
    }

}

const UserLogIn = async (req, res) => {
    try {
        const email = await req.body.email;
        const password = await req.body.password;

        // console.log(mail, verifyPassword);

        const user = await User.findOne({
            where: { email: email },
            attributes: ['id', 'name', 'email', 'password']
        });

        if (!user) res.json("User not found");
        // console.log("User: ", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        // console.log('Comparison completed: ', isMatch);

        if (isMatch) {
            console.log("Password matched");
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, secretKey, { expiresIn: '1h' });
            console.log("token:", token);

            const result = await User.update(
                { token: token },
                {
                    where: {
                        id: user.id,
                    },
                },
            );
            // console.log(result);
            res.set({ "Authorization": `Bearer ${token}` })

            return res.status(200).json({
                status: '200',
                data: '',
                message: '',
                error: ''
            });
        }
        else {
            res.json("Invalid Credentials");
        }
    } catch (error) {
        console.log(error);
    }
}

const UserLogOut = async (req, res) => {
    try {
        const headers = await req.headers.authorization;
        console.log('req.headers.authorization: ', req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.json({
                status: '400',
                message: 'No token found',
                data: '',
                error: ''
            })
        }

        res.removeHeader('Authorization');

        const user = await User.findOne({
            where: { token: token },
            attributes: ['id', 'name', 'email', 'token']
        });

        if (token === user.token) {
            const result = await User.update({ token: null }, { where: { id: user.id } });

            res.json({
                status: '200',
                message: 'Logged out successfully',
                data: '',
                error: ''
            })
        }
        else {
            res.json({
                status: '400',
                message: 'No user found',
                data: '',
                error: ''
            })
        }

    } catch (error) {
        console.log("Something went wrong", error);
    }
}

module.exports = {
    UserLogIn,
    UserLogOut, UserSignUp
};
