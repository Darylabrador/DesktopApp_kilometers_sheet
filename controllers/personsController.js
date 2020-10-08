const bcrypt               = require('bcryptjs');
const crypto               = require('crypto');
const { validationResult } = require('express-validator');

// Models
const Persons = require('../models/persons');


/* --------------- ALL GET PAGE ABOUT PERSONS --------------- */

/**
 * Get index persons page
 *
 * Render index persons page
 * @function getIndexPersons
 * @returns {VIEW} index persons view
 */
exports.getIndexPersons = async (req, res, next) => {
    try {
        const personsInfo = await Persons.findAll({where: {role: 'guest'}});
        res.render('persons/index', {
            backgroundColor: "bg-lightblue-color",
            personsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/dashboard');
    }
}


/**
 * Get create persons page
 *
 * Render create persons page
 * @function getCreatePersons
 * @returns {VIEW} create persons view
 */
exports.getCreatePersons = (req, res, next) => {
    res.render('persons/create', {
        backgroundColor: "bg-lightblue-color"
    });
}


/**
 * Get update persons page
 *
 * Render update persons page
 * @function getUpdatePersons
 * @returns {VIEW} update persons view
 */
exports.getUpdatePersons = async (req, res, next) => {
    const id = req.params.id;

    try {
        const personsInfo = await Persons.findByPk(id);
        if (!personsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/persons');
        }

        res.render('persons/update', {
            backgroundColor: "bg-lightblue-color",
            personsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/persons');
    }

}

/**
 * Get delete persons page
 *
 * Render delete persons page
 * @function getDeletePersons
 * @returns {VIEW} delete persons view
 */
exports.getDeletePersons = async (req, res, next) => {
    const id = req.params.id;

    try {
        const personsInfo = await Persons.findByPk(id);

        if (!personsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/persons');
        }

        res.render('persons/delete', {
            backgroundColor: "bg-lightblue-color",
            personsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/persons');
    }
}


/* --------------- ALL POST PAGE ABOUT PERSONS --------------- */

/**
 * Handle post create persons
 *
 * @function postCreatePersons
 * @returns {VIEW} redirect to '/persons'
 * @throws Will redirect to /persons if one error occursed
 */
exports.postCreatePersons = async (req, res, next) => {
    const { name, surname, functionName } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/persons/create');
    }

    try {
        const newPerson = new Persons();
        newPerson.name = name.charAt(0).toUpperCase() + name.slice(1);
        newPerson.surname = surname.toUpperCase();

        const secretPass = await crypto.createHmac('sha256', Date.now().toString()).digest('hex');
        const login      = name + secretPass.slice(0, 6);
        const password   = await bcrypt.hash(login, 12);
        
        newPerson.login    = login;
        newPerson.password = password;

        if(functionName.length != 0){
            newPerson.function = functionName.toUpperCase();
        }

        await newPerson.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect('/persons');

    } catch (error) {
        console.log(error)
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/persons');
    }
}

/**
 * Handle post update persons
 *
 * @function postUpdatePersons
 * @returns {VIEW} redirect to '/persons'
 * @throws Will redirect to /persons if one error occursed
 */
exports.postUpdatePersons = async (req, res, next) => {
    const { personsId, name, surname, functionName } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/persons/create');
    }

    try {
        const personsInfo = await Persons.findByPk(personsId);
        if (!personsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/persons');
        }

        personsInfo.name = name.charAt(0).toUpperCase() + name.slice(1);
        personsInfo.surname  = surname.toUpperCase();


        if(functionName.length != 0) {
            personsInfo.function = functionName.toUpperCase();
        } else {
            personsInfo.function = "";
        }
       
        await personsInfo.save();

        req.flash('success', 'Mise à jour effectuer !');
        return res.redirect('/persons');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/persons');
    }
}



/**
 * Handle post delete persons
 *
 * @function postDeletePersons
 * @returns {VIEW} redirect to '/persons'
 * @throws Will redirect to /persons if one error occursed
 */
exports.postDeletePersons = async (req, res, next) => {
    const { personsId } = req.body;
    try {
        const personsInfo = await Persons.findByPk(personsId);
        if (!personsInfo) {
            req.flash('error', 'Element introuvable !');
            return res.redirect('/persons');
        }
        await personsInfo.destroy();
        req.flash('success', 'Suppression effectuer !');
        return res.redirect('/persons');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/persons');
    }
}