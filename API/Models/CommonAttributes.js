const attributes = {
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

module.exports = {
    attributes
}