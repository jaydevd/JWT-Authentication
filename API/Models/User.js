/**
 * @name userModel
 * @file User.js
 * @throwsF
 * @description This file will define model of Users table.
 * @author Jaydev Dwivedi (Zignuts)
 */

import { DataTypes } from "sequelize";
import { sequelize } from "./../Config/index";
import { commonAttributes } from './CommonAttributes.js';

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING(60),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    token: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false
    },
    ...commonAttributes
},
    {
        tableName: "users", // Explicitly set the table name
        timestamps: false   // If your table does not have createdAt/updatedAt
    });

export default User;