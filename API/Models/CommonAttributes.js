/**
 * @name commonAttributes
 * @file CommonAttributes.js
 * @param {Request} req
 * @param {Response} res
 * @throwsF
 * @description This file contains all common attributes used across the tables.
 * @author Jaydev Dwivedi (Zignuts)
 */

const commonAttributes = {
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        default: true,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedBy: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}

export {
    commonAttributes
}
