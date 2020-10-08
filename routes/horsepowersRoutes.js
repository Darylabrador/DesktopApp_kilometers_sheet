/** Horsepower routes
 * @module routers/horsepowers
 * @requires express express.Router()
 */

const express                   = require('express');

const { body }                  = require('express-validator');

const horsepowersController = require('../controllers/horsepowersController');

const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

/**
 * Return datatable with all horsepowers info
 * @name getIndexHorsepowers GET
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers' - uri
 * @param {function} horsepowersController.getIndexHorsepowers
 */
router.get('/', isAuth, isAdmin, horsepowersController.getIndexHorsepowers);


/**
 * Return create horsepowers view
 * @name getCreateHorsepowers GET
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/create' - uri
 * @param {function} horsepowersController.getCreateHorsepowers
 */
router.get('/create', isAuth, isAdmin, horsepowersController.getCreateHorsepowers);


/**
 * Return update horsepowers view
 * @name getUpdateHorsepowers GET
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/update/:id' - uri
 * @param {function} horsepowersController.getUpdateHorsepowers
 */
router.get('/update/:id', isAuth, isAdmin, horsepowersController.getUpdateHorsepowers);


/**
 * Return delete horsepowers view
 * @name getDeleteHorsepowers GET
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/delete/:id' - uri
 * @param {function} horsepowersController.getDeleteHorsepowers
 */
router.get('/delete/:id', isAuth, isAdmin, horsepowersController.getDeleteHorsepowers);


/**
 * Handling post creating horsepowers
 * @name postCreateHorsepowers POST
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/create' - uri
 * @param {function} horsepowersController.postCreateHorsepowers
 */
router.post(
    '/create', 
    isAuth, 
    isAdmin,
    [
        body('label', 'Veuillez saisir la description')
            .not()
            .isEmpty(),
        body('case1', "Aucune valeur : Jusqu'à 5 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
        body('case2', "Aucune valeur : De 5 001 km à 20 000 km")
            .not()
            .isEmpty(),
        body('case3', "Aucune valeur : Au-delà de 20 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
    ],
    horsepowersController.postCreateHorsepowers
);


/**
 * Handling post updating horsepowers
 * @name postUpdateHorsepowers POST
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/update' - uri
 * @param {function} horsepowersController.postUpdateHorsepowers
 */
router.post(
    '/update',
    isAuth,
    isAdmin,
    [
        body('label', 'Veuillez saisir la description')
            .not()
            .isEmpty(),
        body('case1', "Aucune valeur : Jusqu'à 5 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
        body('case2', "Aucune valeur : De 5 001 km à 20 000 km")
            .not()
            .isEmpty(),
        body('case3', "Aucune valeur : Au-delà de 20 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
    ],
    horsepowersController.postUpdateHorsepowers
);


/**
 * Handling post deleting horsepowers
 * @name postDeleteHorsepowers POST
 * @function
 * @memberof module:routers/horsepowers
 * @param {string} '/horsepowers/delete' - uri
 * @param {function} horsepowersController.postDeleteHorsepowers
 */
router.post('/delete', isAuth, isAdmin, horsepowersController.postDeleteHorsepowers);

module.exports = router;