const { validationResult } = require('express-validator');

const Entities            = require('../models/entities');
const Persons             = require('../models/persons');
const Vehicles            = require('../models/vehicles');
const KilometerSheets     = require('../models/kilometersheets');
const KilometerSheetRows  = require('../models/kilometersheetrows');
const MoveReasons         = require('../models/movereasons');
const PersonsVehicles     = require('../models/personsVehicles');
const PersonsWorkFors     = require('../models/personsworkfors');




/**
 * Get index kilometerSheet page
 *
 * Render index kilometerSheet page
 * @function getIndexKilometerSheets
 * @returns {VIEW} index kilometerSheet view
 */
exports.getIndexKilometerSheets = async (req, res, next) => {
    try {
        res.render('kilometersheets/index', {
            backgroundColor: "bg-lightblue-color",
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}


/**
 * Get create kilometerSheet page
 *
 * Render create kilometerSheet page
 * @function getCreateKilometerSheets
 * @returns {VIEW} create kilometerSheet view
 */
exports.getCreateKilometerSheets = async (req, res, next) => {
    try {
        const personsVehiclesInfo = await PersonsVehicles.findAll({
            where: { personId: req.userId},
            include: [Persons, Vehicles]
        });

        const personsWorkForInfo = await PersonsWorkFors.findAll({
            where: { personId: req.userId},
            include: [Persons, Entities]
        });

        return res.render('kilometersheets/create', {
            backgroundColor: "bg-darkblue-color",
            personsVehiclesInfo, personsWorkForInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}