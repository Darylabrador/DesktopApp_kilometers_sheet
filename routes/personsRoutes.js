/** Persons routes
 * @module routers/persons
 * @requires express express.Router()
 */


const { body }           = require('express-validator');

const personsController = require('../controllers/personsController');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();

/**
* Return datatable views with person's list
* @name getIndexPersons GET
* @function
* @memberof module:routers/persons
* @param {string} '/persons' - uri
* @param {function} personsController.getIndexPersons
*/
router.get('/', isAuth, personsController.getIndexPersons);


/**
* Return create persons views
* @name getCreatePersons GET
* @function
* @memberof module:routers/persons
* @param {string} '/persons/create' - uri
* @param {function} personsController.getCreatePersons
*/
router.get('/create', isAuth, personsController.getCreatePersons);


/**
* Return update persons views
* @name getUpdatePersons GET
* @function
* @memberof module:routers/persons
* @param {string} '/persons/update/:id' - uri
* @param {function} personsController.getUpdatePersons
*/
router.get('/update/:id', isAuth, personsController.getUpdatePersons);


/**
* Return delete persons views
* @name getDeletePersons GET
* @function
* @memberof module:routers/persons
* @param {string} '/persons/delete/:id' - uri
* @param {function} personsController.getDeletePersons
*/
router.get('/delete/:id', isAuth, personsController.getDeletePersons);


/**
 * Handling post creating persons account
 * @name postCreatePersons POST
 * @function
 * @memberof module:routers/persons
 * @param {string} '/persons/create' - uri
 * @param {function} personsController.postCreatePersons
 */
router.post(
    '/create',
    isAuth,
    [
        body('name', 'Veuillez renseigner le nom')
            .not()
            .isEmpty(),
        body('surname', 'Veuillez renseigner le prénom')
            .not()
            .isEmpty()
    ],
    personsController.postCreatePersons
);


/**
 * Handling post updating persons account
 * @name postUpdatePersons POST
 * @function
 * @memberof module:routers/persons
 * @param {string} '/persons/update' - uri
 * @param {function} personsController.postUpdatePersons
 */
router.post(
    '/update',
    isAuth,
    [
        body('name', 'Veuillez renseigner le nom')
            .not()
            .isEmpty(),
        body('surname', 'Veuillez renseigner le prénom')
            .not()
            .isEmpty()
    ],
    personsController.postUpdatePersons
);


/**
 * Handling post deleting persons account
 * @name postDeletePersons POST
 * @function
 * @memberof module:routers/persons
 * @param {string} '/persons/delete' - uri
 * @param {function} personsController.postDeletePersons
 */
router.post('/delete', isAuth, personsController.postDeletePersons);

module.exports = router;