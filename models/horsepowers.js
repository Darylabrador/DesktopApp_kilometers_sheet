/**
 * Define horsepowers model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const Horsepowers = sequelize.define('horsepowers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    case1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    case2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    case3: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, { timestamps: true });

module.exports = Horsepowers;