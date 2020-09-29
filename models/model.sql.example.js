const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

/**
 * Define users model
 */

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    resetToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lastConnect: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { timestamps: true });

module.exports = Users;