const { validationResult } = require('express-validator');

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

/* --------------- ALL GET PAGE ABOUT KILOMETERS SHEETS  --------------- */


/**
 * Get index kilometerSheet page
 *
 * Render index kilometerSheet page
 * @function getIndexKilometerSheets
 * @returns {VIEW} index kilometerSheet view
 */
exports.getIndexKilometerSheets = async (req, res, next) => {
    try {
        const kilometerSheetInfo = await KilometerSheets.findAll({
            where: { personId: req.userId },
            include: [Persons, Vehicles, Entities]
        });
        res.render('kilometersheets/index', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo
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


/**
 * Get update kilometerSheet page
 *
 * Render update kilometerSheet page
 * @function getUpdateKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.getUpdateKilometerSheets = async (req, res, next) => {
    const id = req.params.id;
    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { personId: req.userId, id },
            include: [Persons, Vehicles, Entities]
        });

        if (!kilometerSheetInfo) {
            req.flash('error', 'Fiche introuvable');
            return res.redirect('/kilometersheets');
        }

        const horsepowersInfo = await Vehicles.findOne({
            where: { id: kilometerSheetInfo.vehicle.id },
            include: [ Horsepowers ] 
        });

        res.render('kilometersheets/update', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo, horsepowersInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}



/**
 * Get select info about movereason kilometerSheet page
 *
 * @function getMovereason
 * @returns {JSON}
 */
exports.getMovereason = async (req, res, next) => {
    try {
        const selectInfo = await MoveReasons.findAll();
        res.status(200).json({
            selectField: selectInfo
        })
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}


/**
 * Get delete kilometerSheet page
 *
 * Render delete kilometerSheet page
 * @function getDeleteKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.getDeleteKilometerSheets = async (req, res, next) => {
    const id = req.params.id;

    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { personId: req.userId, id },
            include: [Persons, Vehicles, Entities]
        });

        if(!kilometerSheetInfo){
            req.flash('error', 'Fiche introuvable');
            return res.redirect('/kilometersheets');
        }

        res.render('kilometersheets/delete', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/* --------------- ALL POST PAGE ABOUT KILOMETERS SHEETS --------------- */


/**
 * Handle post create kilometerSheet
 *
 * @function postCreateKilometerSheets
 * @returns {VIEW} redirect to '/kilometersheets/:id'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateKilometerSheets = async (req, res, next) => {
    const { entityId, vehicleId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/kilometersheets/create');
    }

    try {
        const entityExist  = await Entities.findByPk(entityId);
        const vehicleExist = await Vehicles.findByPk(vehicleId);

        if(!entityExist) {
            req.flash('error', 'Entité inexistante');
            return res.redirect(`/kilometersheets`); 
        }

        if (!vehicleExist) {
            req.flash('error', 'Véhicule inexistante');
            return res.redirect(`/kilometersheets`); 
        }

        const newSheet = new KilometerSheets({ 
            personId: req.userId,
            entityId, vehicleId
        });

        const newSheetSaved = await newSheet.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect(`/kilometersheets/update/${newSheetSaved.id}`);
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect(`/kilometersheets`);
    }
}

/**
 * Handle post delete kilometerSheet info
 *
 * @function postDeleteKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.postDeleteKilometerSheets = async (req, res, next) => {
    const { kilometersheetId } = req.body;

    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { 
                personId: req.userId, 
                id: kilometersheetId
            },
        });

        if (!kilometerSheetInfo){
            req.flash('error', 'Fiche inexistante');
            return res.redirect(`/kilometersheets`);
        }

        await KilometerSheetsRows.destroy({ where: { id: kilometersheetId } });
        await kilometerSheetInfo.destroy();

        req.flash('success', 'Suppression effectuer !');
        return res.redirect(`/kilometersheets`);
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}