/**
 * @name index
 * @file index.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This file will import all middlewares.
 * @author Jaydev Dwivedi (Zignuts)
 */
const isAuthenticated = require('./isAuthenticated.js');
// import isAuthenticated from "./isAuthenticated.js";

module.exports = {
    isAuthenticated
};
