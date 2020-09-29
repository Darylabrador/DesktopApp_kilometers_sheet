/**
 * Define movereasons model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const MoveReasons = sequelize.define('moveReasons', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

module.exports = MoveReasons;