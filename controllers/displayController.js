// Get all models
const Entities            = require('../models/entities');
const Persons             = require('../models/persons');
const Vehicles            = require('../models/vehicles');
const KilometerSheets     = require('../models/kilometersheets');
const KilometerSheetRows  = require('../models/kilometersheetrows');
const MoveReasons         = require('../models/movereasons');
const PersonsVehicles     = require('../models/personsVehicles');
const PersonsWorkFors     = require('../models/personsworkfors');


/* --------------- GENERAL GET PAGE --------------- */


/**
 * Get login page
 *
 * Render login page
 * @function getLogin
 * @returns {VIEW} login view
 */
exports.getLogin = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login', {
        backgroundColor: "bg-darkblue-color"
    });
}


/**
 * Get dashboard page
 *
 * Render dashboard page
 * @function getDashboard
 * @returns {VIEW} dashboard view
 */
exports.getDashboard = (req, res, next) => {
    res.render('dashboard', {
        backgroundColor: "bg-lightblue-color"
    });
}