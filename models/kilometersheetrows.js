/**
 * Define kilometerSheetRows model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const KilometerSheetsRows = sequelize.define('kilometerSheetsRows', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    travel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    speedometerStart: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    speedometerEnd: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, { timestamps: true });

module.exports = KilometerSheetsRows;