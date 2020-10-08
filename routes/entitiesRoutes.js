/** Entities routes
 * @module routers/entities
 * @requires express express.Router()
 */

const entitiesController  = require('../controllers/entitiesController');

const { body }            = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();

/**
 * Return all entities on view
 * @name getIndexEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities' - uri
 * @param {function} entitiesController.getIndexEntities
 */
router.get('/', isAuth, entitiesController.getIndexEntities);


/**
 * Return create entities view
 * @name getCreateEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/create' - uri
 * @param {function} entitiesController.getCreateEntities
 */
router.get('/create', isAuth, entitiesController.getCreateEntities);


/**
 * Return entities update view
 * @name getUpdateEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/update/:id' - uri
 * @param {function} entitiesController.getUpdateEntities
 */
router.get('/update/:id', isAuth, entitiesController.getUpdateEntities);


/**
 * Return entities delete view
 * @name getDeleteEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/delete/:id' - uri
 * @param {function} entitiesController.getDeleteEntities
 */
router.get('/delete/:id', isAuth, entitiesController.getDeleteEntities);


/**
 * Return all entities associate to person on view
 * @name getAssociateListEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/associate/liste' - uri
 * @param {function} entitiesController.getAssociateListEntities
 */
router.get('/associate/liste', isAuth, entitiesController.getAssociateListEntities);


/**
 * Return view to create association between entities and person
 * @name getAssociateCreateEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/associate/create' - uri
 * @param {function} entitiesController.getAssociateCreateEntities
 */
router.get('/associate/create', isAuth, entitiesController.getAssociateCreateEntities);


/**
 * Return view to delete association between entities and person
 * @name getAssociateDeleteEntities GET
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/associate/delete/:id' - uri
 * @param {function} entitiesController.getAssociateDeleteEntities
 */
router.get('/associate/delete/:id', isAuth, entitiesController.getAssociateDeleteEntities);


/**
 * Handling post create entity
 * @name postCreateEntities POST
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/create' - uri
 * @param {function} entitiesController.postCreateEntities
 */
router.post(
    '/create',
    isAuth,
    [
        body('name', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postCreateEntities
);


/**
 * Handling post update entity
 * @name postUpdateEntities POST
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/update' - uri
 * @param {function} entitiesController.postUpdateEntities
 */
router.post(
    '/update',
    isAuth,
    [
        body('name', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postUpdateEntities
);


/**
 * Handling post delete entity
 * @name postDeleteEntities POST
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/delete' - uri
 * @param {function} entitiesController.postDeleteEntities
 */
router.post('/delete', isAuth, entitiesController.postDeleteEntities);


/**
 * Handling post create association between entity and person
 * @name postCreateAssociateEntities POST
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/associate/create' - uri
 * @param {function} entitiesController.postCreateAssociateEntities
 */
router.post(
    '/associate/create',
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('entitiesId', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postCreateAssociateEntities
);


/**
 * Handling post delete association between entity and person
 * @name postDeleteAssociateEntities POST
 * @function
 * @memberof module:routers/entities
 * @param {string} '/entities/associate/delete' - uri
 * @param {function} entitiesController.postDeleteAssociateEntities
 */
router.post('/associate/delete', isAuth, entitiesController.postDeleteAssociateEntities);


module.exports = router;