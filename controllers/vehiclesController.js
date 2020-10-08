const { validationResult } = require('express-validator');

// Models
const Vehicles       = require('../models/vehicles');
const Horsepowers    = require('../models/horsepowers');
const Persons        = require('../models/persons');
const PersonsVehicles = require('../models/personsVehicles');

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
 * @throws Will redirect to  '/vehicles' an error if one error occursed
 */
exports.postCreateVehicles = async (req, res, next) => {
    const { mark, model, horsepower, year, registrationNumber } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/vehicles/create');
    }

    try {
        const vehiculExist = await Vehicles.findOne({
            where: {
                mark, model,
                horsepowerId: horsepower,
                year, registrationNumber
            }
        })

        if (!vehiculExist) {
            const newVehicles = new Vehicles({
                mark, model,
                horsepowerId: horsepower,
                year, registrationNumber
            });

            await newVehicles.save();
            req.flash('success', 'Création effectuer !');
            return res.redirect('/vehicles');
        }

        req.flash('error', 'Vehicule existe déjà');
        return res.redirect('/vehicles');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}

/**
 * Handle post update vehicles
 *
 * @function postUpdateVehicles
 * @returns {VIEW} redirect to '/vehicles'
 * @throws Will redirect to  '/vehicles' an error if one error occursed
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
 * @throws Will redirect to  '/vehicles' an error if one error occursed
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


/* --------------- ALL ASSOCIATIONS PAGE ABOUT VEHICLES --------------- */


/**
 * Get associate liste for vehicles
 *
 * Render associate liste for vehicles
 * @function getAssociateListVehicles
 * @returns {VIEW} associate liste vehicles view
 */
exports.getAssociateListVehicles = async (req, res, next) => {
    var associateInfo;

    try {

        if(req.isAdmin) {
            associateInfo = await PersonsVehicles.findAll({
                include: [
                    Persons, Vehicles
                ]
            });
        } else {
            associateInfo = await PersonsVehicles.findAll({
                include: [
                    { model: Vehicles },
                    {
                        model: Persons,
                        where: {id: req.userId}
                    }
                ]
            });
        }
        res.render('vehicles/associateListe', {
            backgroundColor: "bg-lightblue-color",
            associateInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles');
    }
}


/**
 * Get create associate for vehicles
 *
 * Render create associate for vehicles
 * @function getAssociateCreateVehicles
 * @returns {VIEW} create associate vehicles view
 */
exports.getAssociateCreateVehicles = async (req, res, next) => {
    var personsInfo;
    var vehiclesInfo;
    try {
        if(req.isAdmin) {
            personsInfo = await Persons.findAll({ where: { role: 'guest' } });
            vehiclesInfo = await Vehicles.findAll({ include: Horsepowers });
        } else {
            personsInfo  = await Persons.findAll({ where: { role: 'guest', id: req.userId } });
            vehiclesInfo = await Vehicles.findAll({ include: Horsepowers });
        }
        res.render('vehicles/associateCreate', {
            backgroundColor: "bg-lightblue-color",
            personsInfo, vehiclesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles/associate/liste');
    }
}

/**
 * Get delete associate vehicles 
 *
 * Render delete associate vehicles
 * @function getAssociateDeleteVehicles
 * @returns {VIEW} delete associate vehicles view
 */
exports.getAssociateDeleteVehicles = async (req, res, next) => {
    const id = req.params.id;
    var associateInfo;

    try {
        if(req.isAdmin) {
            associateInfo = await PersonsVehicles.findOne({
                where: {id},
                include: [Persons, Vehicles]
            });
        } else { 
            associateInfo = await PersonsVehicles.findOne({
                where: { id, personId: req.userId},
                include: [ Persons, Vehicles ]
            });
        }

        if (!associateInfo){
            req.flash('error', 'Element introuvable');
            return res.redirect('/vehicles/associate/liste');
        }

        res.render('vehicles/associateDelete', {
            backgroundColor: "bg-lightblue-color",
            associateInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles/associate/liste');
    }
}

/**
 * Handle post create vehicles associate
 *
 * @function postCreateAssociateVehicles
 * @returns {VIEW} redirect to '/vehicles/associate/liste'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateAssociateVehicles = async (req, res, next) => {
    const { individuId, vehicleId} = req.body;
    var newVehiclesAssociate;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/vehicles/associate/create');
    }

    try {
        const personExist   = await Persons.findByPk(individuId);
        const vehicleExist  = await Vehicles.findByPk(vehicleId);

        if (!personExist) {
            req.flash('error', 'Individu inexistant');
            return res.redirect('/vehicles/associate/create');
        }

        if (!vehicleExist) {
            req.flash('error', 'Vehicule inexistant');
            return res.redirect('/vehicles/associate/create');
        }

        const associateExist = await PersonsVehicles.findOne({
            where: {
                personId: individuId,
                vehicleId: vehicleId
            }
        })

        if (!associateExist) {
            if(req.isAdmin) {
                newVehiclesAssociate = new PersonsVehicles({
                    personId: individuId,
                    vehicleId: vehicleId
                });
            } else {
                newVehiclesAssociate = new PersonsVehicles({
                    personId: req.userId,
                    vehicleId: vehicleId
                });
            }

            await newVehiclesAssociate.save();
            req.flash('success', 'Relation ajoutée avec succès !');
            return res.redirect('/vehicles/associate/liste');
        }

        req.flash('error', 'Association existe déjà');
        return res.redirect('/vehicles/associate/liste');

    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles/associate/liste');
    }
}


/**
 * Handle post delete associate vehicles
 *
 * @function postDeleteAssociateVehicles
 * @returns {VIEW} redirect to '/vehicles/associate/liste'
 * @throws Will redirect to  '/vehicles/associate/liste' an error if one error occursed
 */
exports.postDeleteAssociateVehicles = async (req, res, next) => {
    const { associateId } = req.body;
    var associateDelete;

    try {
        if(req.isAdmin) {
            associateDelete = await PersonsVehicles.findByPk(associateId);
        } else {
            associateDelete = await PersonsVehicles.findOne({
                where: { id: associateId, personId: req.userId}
            });
        }

        if (!associateDelete) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/vehicles/associate/liste');
        }

        await associateDelete.destroy();
        req.flash('success', 'Suppression effectuer');
        return res.redirect('/vehicles/associate/liste');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/vehicles/associate/liste');
    }
}