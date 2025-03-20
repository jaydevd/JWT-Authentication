/**
 * @name commonAttributes
 * @file CommonAttributes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This file contains all common attributes used across the tables.
 * @author Jaydev Dwivedi (Zignuts)
 */

const { DataTypes } = require("sequelize");

const commonAttributes = {
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "Jaydev Dwivedi"
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Date.now()
    },
    updatedBy: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: "Jaydev Dwivedi"
    }
}

module.exports = {
    commonAttributes
}