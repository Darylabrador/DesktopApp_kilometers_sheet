/**
 * Define vehicles model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const Vehicles = sequelize.define('vehicles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: true });

module.exports = Vehicles;