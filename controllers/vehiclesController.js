const { validationResult } = require('express-validator');

// Models
const Vehicles    = require('../models/vehicles');
const Horsepowers = require('../models/horsepowers');


/* --------------- ALL GET PAGE ABOUT VEHICLES --------------- */

/**
 * Get index vehicles page
 *
 * Render index vehicles page
 * @function getIndexVehicles
 * @returns {VIEW} index vehicles view
 */
exports.getIndexVehicles = async (req, res, next) => {
    try {
        const vehiclesInfo = await Vehicles.findAll({ include: Horsepowers});
        res.render('vehicles/index', {
            backgroundColor: "bg-lightblue-color",
            vehiclesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}


/**
 * Get create vehicles page
 *
 * Render create vehicles page
 * @function getCreateVehicles
 * @returns {VIEW} create vehicles view
 */
exports.getCreateVehicles = async (req, res, next) => {
    const horspowersInfo = await Horsepowers.findAll();
    res.render('vehicles/create', {
        backgroundColor: "bg-lightblue-color",
        horspowersInfo
    });
}


/**
 * Get update vehicles page
 *
 * Render update vehicles page
 * @function getUpdateVehicles
 * @returns {VIEW} update vehicles view
 */
exports.getUpdateVehicles = async (req, res, next) => {
    const id = req.params.id;

    try {
        const vehiclesInfo   = await Vehicles.findByPk(id);
        const horspowersInfo = await Horsepowers.findAll();

        if (!vehiclesInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/vehicles');
        }

        res.render('vehicles/update', {
            backgroundColor: "bg-lightblue-color",
            vehiclesInfo,
            horspowersInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }

}

/**
 * Get delete vehicles page
 *
 * Render delete vehicles page
 * @function getDeleteVehicles
 * @returns {VIEW} delete vehicles view
 */
exports.getDeleteVehicles = async (req, res, next) => {
    const id = req.params.id;

    try {
        const vehiclesInfo = await Vehicles.findOne({
            where: { id },
            include: Horsepowers
        });

        if (!vehiclesInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/vehicles');
        }

        res.render('vehicles/delete', {
            backgroundColor: "bg-lightblue-color",
            vehiclesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}


/* --------------- ALL POST PAGE ABOUT VEHICLES --------------- */


/**
 * Handle post create vehicles
 *
 * @function postCreateVehicles
 * @returns {VIEW} redirect to '/vehicles'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateVehicles = async (req, res, next) => {
    const { mark, model, horsepower, year, registrationNumber } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/vehicles/create');
    }

    try {
        const newVehicles = new Vehicles({
            mark, model, 
            horsepowerId: horsepower,
            year, registrationNumber
        });

        await newVehicles.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect('/vehicles');

    } catch (error) {
        console.log(error)
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}

/**
 * Handle post update vehicles
 *
 * @function postUpdateVehicles
 * @returns {VIEW} redirect to '/vehicles/update'
 * @throws Will throw an error if one error occursed
 */
exports.postUpdateVehicles = async (req, res, next) => {
    const { mark, model, horsepower, year, registrationNumber } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/vehicles/create');
    }

    try {
        const vehiclesInfo = await Vehicles.findByPk(vehiclesId);
        if (!vehiclesInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/vehicles');
        }

        vehiclesInfo.mark = mark;
        vehiclesInfo.model = model;
        vehiclesInfo.horsepowerId = horsepower;
        vehiclesInfo.year = year;
        vehiclesInfo.registrationNumber = registrationNumber;
        await VehiclesInfo.save();

        req.flash('success', 'Mise à jour effectuer !');
        return res.redirect('/vehicles');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}



/**
 * Handle post delete vehicles
 *
 * @function postDeleteVehicles
 * @returns {VIEW} redirect to '/vehicles'
 * @throws Will throw an error if one error occursed
 */
exports.postDeleteVehicles = async (req, res, next) => {
    const { vehiclesId } = req.body;
    try {
        const vehiclesInfo = await Vehicles.findByPk(vehiclesId);
        if (!vehiclesInfo) {
            req.flash('error', 'Element introuvable !');
            return res.redirect('/vehicles');
        }
        await vehiclesInfo.destroy();
        req.flash('success', 'Suppression effectuer !');
        return res.redirect('/vehicles');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}