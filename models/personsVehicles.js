/**
 * Define personsVehicles model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const PersonsVehicles = sequelize.define('personsVehicles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: true });

module.exports = PersonsVehicles;