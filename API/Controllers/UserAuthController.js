/**
 * @name signup/login/logout
 * @file AuthController.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description UserSignUp method will create a new user, UserLogIn method will log in an existing user and UserLogOut method will log out the logged in user.
 * @author Jaydev Dwivedi (Zignuts)
 */
import { v4 as uuidv4 } from 'uuid';

const UserSignUp = async (req, res) => {

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
                status: '500',
                data: '',
                message: 'Internal Server Error',
                error: validator.errors.all()
            })
        }
    } catch (error) {
        res.json({
            status: '500',
            data: '',
            message: 'Internal Server Error',
            error: validator.errors.all()
        })
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

        const isMatch = await bcrypt.compare(verifyPassword, user.password);

        // console.log('Comparison completed: ', isMatch);

        if (isMatch) {
            const secretKey = process.env.SECRET_KEY;

            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, secretKey, { expiresIn: '1h' });

            const result = await User.update(
                { token: token },
                {
                    where: {
                        id: user.id,
                    },
                },
            );

            // console.log(result);
            req.header('Authorization', `Bearer ${token}`);

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
        const token = req.headers.authorization.split(' ')[1];
        blacklist.add(token);

        if (!token) {
            res.json({
                status: '400',
                message: 'No token found',
                data: '',
                error: ''
            })
        }

        res.status(200).json({
            status: '200',
            message: 'Logged out successfully',
            data: '',
            error: ''
        });

        const user = User.findOne({
            where: { token: token },
            attributes: ['id', 'name', 'email']
        });

        if (token === user.token) {
            user.token = null;

            return res.json({
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
        console.log("Something went wrong");
    }
}

export {
    UserLogIn,
    UserLogOut, UserSignUp
};
