/**
 * @name index
 * @file index.js
 * @throwsF
 * @description This file will import all the controllers in the API.
 * @author Jaydev Dwivedi (Zignuts)
 */
const { UserLogIn, UserLogOut, UserSignUp } = require('./UserAuthController');
// import { UserLogIn, UserLogOut, UserSignUp } from 'UserAuthController';

module.exports = {
    UserLogIn,
    UserLogOut,
    UserSignUp
};
