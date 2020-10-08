/** Kilometers routes
 * @module routers/kilometers
 * @requires express express.Router()
 */

const { body }             = require('express-validator');

const kilometersController = require('../controllers/kilometersController');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();

/**
* Return datatable views with all kilometers sheets
* @name getIndexKilometerSheets GET
* @function
* @memberof module:routers/kilometers
* @param {string} '/kilometersheets' - uri
* @param {function} kilometersController.getIndexKilometerSheets
*/
router.get('/', isAuth, kilometersController.getIndexKilometerSheets);


/**
* Return create kilometersheets views
* @name getCreateKilometerSheets GET
* @function
* @memberof module:routers/kilometers
* @param {string} '/kilometersheets/create' - uri
* @param {function} kilometersController.getCreateKilometerSheets
*/
router.get('/create', isAuth, kilometersController.getCreateKilometerSheets);


/**
* Return update kilometersheets views
* @name getUpdateKilometerSheets GET
* @function
* @memberof module:routers/kilometers
* @param {string} '/kilometersheets/update/:id' - uri
* @param {function} kilometersController.getUpdateKilometerSheets
*/
router.get('/update/:id', isAuth, kilometersController.getUpdateKilometerSheets);


/**
* Return json with movereason
* @name getMovereason GET
* @function
* @memberof module:routers/kilometers
* @param {string} '/kilometersheets/reasonselect' - uri
* @param {function} kilometersController.getMovereason
*/
router.get('/reasonselect', isAuth, kilometersController.getMovereason);


/**
* Return delete kilometersheets views
* @name getDeleteKilometerSheets GET
* @function
* @memberof module:routers/kilometers
* @param {string} '/kilometersheets/delete/:id' - uri
* @param {function} kilometersController.getDeleteKilometerSheets
*/
router.get('/delete/:id', isAuth, kilometersController.getDeleteKilometerSheets);


/**
 * Handling post creating kilometersheets
 * @name postCreateKilometerSheets POST
 * @function
 * @memberof module:routers/kilometers
 * @param {string} '/kilometersheets/create' - uri
 * @param {function} kilometersController.postCreateKilometerSheets
 */
router.post(
    '/create',
    isAuth,
    [
        body('entityId', 'Veuillez renseigner l\'entité')
            .not()
            .isEmpty(),
        body('vehicleId', 'Veuillez renseigner le véhicule')
            .not()
            .isEmpty(),
    ],
    kilometersController.postCreateKilometerSheets
);


/**
 * Handling post adding row to kilometersheets
 * @name postAddRowKilometerSheets POST
 * @function
 * @memberof module:routers/kilometers
 * @param {string} '/kilometersheets/addrows' - uri
 * @param {function} kilometersController.postAddRowKilometerSheets
 */
router.post('/addrows', isAuth, kilometersController.postAddRowKilometerSheets)


/**
 * Handling post deleting  kilometersheets and its rows
 * @name postDeleteKilometerSheets POST
 * @function
 * @memberof module:routers/kilometers
 * @param {string} '/kilometersheets/delete' - uri
 * @param {function} kilometersController.postDeleteKilometerSheets
 */
router.post('/delete', isAuth, kilometersController.postDeleteKilometerSheets)


/**
 * Handling post exporting  kilometersheets and its rows to PDF
 * @name createPdfSheets POST
 * @function
 * @memberof module:routers/kilometers
 * @param {string} '/kilometersheets/export' - uri
 * @param {function} kilometersController.createPdfSheets
 */
router.post('/export', isAuth, kilometersController.createPdfSheets);

module.exports = router;