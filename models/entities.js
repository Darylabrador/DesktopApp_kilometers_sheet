/**
 * Define entities model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const Entities = sequelize.define('entities', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('entreprise', 'association'),
        allowNull: false
    }
}, { timestamps: true });

module.exports = Entities;