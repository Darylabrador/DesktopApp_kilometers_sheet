/** Vehicles routes
 * @module routers/vehicles
 * @requires express express.Router()
 */

const { body }           = require('express-validator');

const vehiclesController = require('../controllers/vehiclesController');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();


/**
* Return datatable views on all vehicles
* @name getIndexVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles' - uri
* @param {function} vehiclesController.getIndexVehicles
*/
router.get('/', isAuth, vehiclesController.getIndexVehicles);


/**
* Return create vehicle views
* @name getCreateVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/create' - uri
* @param {function} vehiclesController.getCreateVehicles
*/
router.get('/create', isAuth, vehiclesController.getCreateVehicles);


/**
* Return update vehicle views
* @name getUpdateVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/update/:id' - uri
* @param {function} vehiclesController.getUpdateVehicles
*/
router.get('/update/:id', isAuth, vehiclesController.getUpdateVehicles);


/**
* Return delete vehicle views
* @name getDeleteVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/delete/:id' - uri
* @param {function} vehiclesController.getDeleteVehicles
*/
router.get('/delete/:id', isAuth, vehiclesController.getDeleteVehicles);


/**
* Return datatable association views betwwen vehicle and person
* @name getAssociateListVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/associate/liste' - uri
* @param {function} vehiclesController.getAssociateListVehicles
*/
router.get('/associate/liste', isAuth, vehiclesController.getAssociateListVehicles);


/**
* Return create association views betwwen vehicle and person
* @name getAssociateCreateVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/associate/create' - uri
* @param {function} vehiclesController.getAssociateCreateVehicles
*/
router.get('/associate/create', isAuth, vehiclesController.getAssociateCreateVehicles);


/**
* Return delete association views betwwen vehicle and person
* @name getAssociateDeleteVehicles GET
* @function
* @memberof module:routers/vehicles
* @param {string} '/vehicles/associate/delete/:id' - uri
* @param {function} vehiclesController.getAssociateDeleteVehicles
*/
router.get('/associate/delete/:id', isAuth, vehiclesController.getAssociateDeleteVehicles);


/**
 * Handling post creating vehicle
 * @name postCreateVehicles POST
 * @function
 * @memberof module:routers/vehicles
 * @param {string} '/vehicles/create' - uri
 * @param {function} vehiclesController.postCreateVehicles
 */
router.post(
    '/create',
    isAuth,
    [
        body('mark', 'Veuillez renseigner la maque')
            .not()
            .isEmpty(),
        body('model', 'Veuillez renseigner le modèle')
            .not()
            .isEmpty(),
        body('horsepower', 'Veuillez renseigner la puissance')
            .not()
            .isEmpty()
            .isNumeric(),
        body('year', 'Veuillez renseigner l\'année')
            .not()
            .isEmpty()
            .isNumeric(),
        body('registrationNumber', 'Veuillez renseigner l\'immatriculation')
            .not()
            .isEmpty()
    ],
    vehiclesController.postCreateVehicles
);


/**
 * Handling post updating vehicle
 * @name postUpdateVehicles POST
 * @function
 * @memberof module:routers/vehicles
 * @param {string} '/vehicles/update' - uri
 * @param {function} vehiclesController.postUpdateVehicles
 */
router.post(
    '/update',
    isAuth,
    [
        body('mark', 'Veuillez renseigner la maque')
            .not()
            .isEmpty(),
        body('model', 'Veuillez renseigner le modèle')
            .not()
            .isEmpty(),
        body('horsepower', 'Veuillez renseigner la puissance')
            .not()
            .isEmpty()
            .isNumeric(),
        body('year', 'Veuillez renseigner l\'année')
            .not()
            .isEmpty()
            .isNumeric(),
        body('registrationNumber', 'Veuillez renseigner l\'immatriculation')
            .not()
            .isEmpty()
    ],
    vehiclesController.postUpdateVehicles
);


/**
 * Handling post creating association between vehicle and person
 * @name postCreateAssociateVehicles POST
 * @function
 * @memberof module:routers/vehicles
 * @param {string} '/vehicles/associate/create' - uri
 * @param {function} vehiclesController.postCreateAssociateVehicles
 */
router.post(
    '/associate/create',
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('vehicleId', 'Veuillez saisir le véhicule')
            .not()
            .isEmpty()
    ],
    vehiclesController.postCreateAssociateVehicles
);


/**
 * Handling post deleting association between vehicle and person
 * @name postDeleteAssociateVehicles POST
 * @function
 * @memberof module:routers/vehicles
 * @param {string} '/vehicles/associate/delete' - uri
 * @param {function} vehiclesController.postDeleteAssociateVehicles
 */
router.post('/associate/delete', isAuth, vehiclesController.postDeleteAssociateVehicles);


/**
 * Handling post deleting vehicle
 * @name postDeleteVehicles POST
 * @function
 * @memberof module:routers/vehicles
 * @param {string} '/vehicles/delete' - uri
 * @param {function} vehiclesController.postDeleteVehicles
 */
router.post('/delete', isAuth, vehiclesController.postDeleteVehicles);

module.exports = router;