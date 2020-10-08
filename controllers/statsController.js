const { validationResult } = require('express-validator');
const sequelize           = require('sequelize');

const Entities            = require('../models/entities');
const Persons             = require('../models/persons');
const Vehicles            = require('../models/vehicles');
const KilometerSheets     = require('../models/kilometersheets');
const KilometerSheetRows  = require('../models/kilometersheetrows');

/**
 * Get stats page
 *
 * Render stats page
 * @function getStats
 * @returns {VIEW} stats view
 */
exports.getStats = async (req, res, next) => {
    try {
        const kilometerSheetInfo = await KilometerSheets.findAll({
            attributes: [
                'id',
                [sequelize.fn('sum', sequelize.col('totalKilometer')), 'totalKm'],
                [sequelize.fn('sum', sequelize.col('compensation')), 'totalCompensation'],
                'entityId'
            ],
            group: ['entityId'],  
            raw: true
        });
        const entityInfo = await Entities.findAll();

        res.render('stats/entities', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo, entityInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/dashboard');
    }
}



/**
 * Get detailled stats page
 *
 * Render detailled stats page
 * @function getStatsDetails
 * @returns {VIEW} stats detail view
 */
exports.getStatsDetails = async (req, res, next) => {
    const id = req.params.id;

    try {
        let totalKmVehicle = await KilometerSheets.findAll({
            where: { entityId: id },
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalKilometer')), 'totalKm'],
                'vehicleId',
                'personId'
            ],
            group: ['vehicleId'],
            include: [{
                model: Vehicles,
                attributes: ['mark', 'model', 'registrationNumber']
            }],
            raw: false
        });

        const totalKmPersons = await KilometerSheets.findAll({
            where: { entityId: id },
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalKilometer')), 'totalKm'],
                'personId'
            ],
            group: ['personId'],
            include: [{
                model: Persons,
                attributes: ['name', 'surname']
            }],
            raw: false
        });

        let totalKmTravel = await KilometerSheetRows.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('distance')), 'totalKmTravel'],
                'kilometerSheetId',
                'travel'
            ],
            group: ['travel'],
            include:[{
                model: KilometerSheets,
                where: { entityId: id }
            }],
            raw: true
        }); 

        res.render('stats/details', {
            backgroundColor: "bg-lightblue-color",
            totalKmPersons, totalKmVehicle, totalKmTravel
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/dashboard');
    }
}