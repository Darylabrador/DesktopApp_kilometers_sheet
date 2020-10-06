const { validationResult } = require('express-validator');
const sequelize           = require('sequelize');

const Entities            = require('../models/entities');
const Persons             = require('../models/persons');
const Vehicles            = require('../models/vehicles');
const KilometerSheets     = require('../models/kilometersheets');
const KilometerSheetRows  = require('../models/kilometersheetrows');
const MoveReasons         = require('../models/movereasons');
const PersonsVehicles     = require('../models/personsVehicles');
const PersonsWorkFors     = require('../models/personsworkfors');
const KilometerSheetsRows = require('../models/kilometersheetrows');
const Horsepowers         = require('../models/horsepowers');

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
        return res.redirect('/stats');
    }
}



/**
 * Get stats detail page
 *
 * Render stats detail page
 * @function getStatsDetails
 * @returns {VIEW} stats detail view
 */
exports.getStatsDetails = async (req, res, next) => {
    let totalKmTravelArray = [];
    let totalKmTravelArrayModif = [];
    let totalKmTravelArrayFinal = [];
    const id = req.params.id;

    try {
        const totalKmPersons = await KilometerSheets.findAll({
            where: { entityId: id},
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalKilometer')), 'totalKm'],
                'vehicleId',
                'personId'
            ],
            group: ['personId'],
            raw: true
        });

        const totalKmVehicle = await KilometerSheets.findAll({
            where: { entityId: id },
            attributes: [
                [sequelize.fn('sum', sequelize.col('totalKilometer')), 'totalKm'],
                'vehicleId',
                'personId'
            ],
            group: ['vehicleId'],
            raw: true
        });

        const infoSheets = await KilometerSheets.findAll({
            where: { entityId: id }
        });

        for (let i = 0; i < infoSheets.length; i++){
            let totalKmTravel = await KilometerSheetRows.findAll({
                where: { kilometerSheetId: infoSheets[i].id },
                attributes: [
                    [sequelize.fn('sum', sequelize.col('distance')), 'totalKmTravel'],
                    'kilometerSheetId',
                    'travel'
                ],
                group: ['travel'],
                raw: true
            }); 
            totalKmTravelArray.push(totalKmTravel)
        }
        
        for (let i = 0; i < totalKmTravelArray.length; i++) { 
            for (let j = 0; j < totalKmTravelArray[i].length; j++) {
                totalKmTravelArrayModif.push({
                    totalKmTravel: totalKmTravelArray[i][j].totalKmTravel,
                    travel: totalKmTravelArray[i][j].travel
                });
            }
        }

        const personInfo  = await Persons.findAll();
        const vehicleInfo = await Vehicles.findAll();

        res.render('stats/details', {
            backgroundColor: "bg-lightblue-color",
            totalKmPersons, totalKmVehicle, totalKmTravelArrayModif,
            personInfo, vehicleInfo
        });

    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/stats');
    }
}