/**
 * Define personsWorkFors model
 */

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/database');

const Personsworkfors = sequelize.define('personsWorkFors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: true });

module.exports = Personsworkfors;