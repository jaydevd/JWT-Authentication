/**
 * @name AuthRoutes
 * @file AuthRoutes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This method will manage user authentication routes.
 * @author Jaydev Dwivedi (Zignuts)
 */
import express from "express";
// import { UserLogIn, UserLogOut, UserSignUp } from './../Controllers/index';
import { UserLogIn, UserLogOut, UserSignUp } from './../Controllers/index';
// import {isAuthenticated} from './../Middlewares/isAuthenticated';

const router = express.Router();

router.post('/user/signup', UserSignUp);
router.get('/user/login', UserLogIn);
router.post('/user/logout', UserLogOut);

export default router;