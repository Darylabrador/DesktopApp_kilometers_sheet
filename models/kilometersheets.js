/**
 * Define kilometerSheets model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const KilometerSheets = sequelize.define('kilometerSheets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    totalKilometer: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    compensation: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, { timestamps: true });

module.exports = KilometerSheets;