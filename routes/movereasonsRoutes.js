/** Movereasons routes
 * @module routers/movereasons
 * @requires express express.Router()
 */

const { body }              = require('express-validator');

const movereasonsController = require('../controllers/movereasonsController');

const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/isAdmin');

const router = require('express').Router();


/**
* Return datatable views for move reason's (comments on sheets)
* @name getIndexMovereasons GET
* @function
* @memberof module:routers/movereasons
* @param {string} '/movereasons' - uri
* @param {function} movereasonsController.getIndexMovereasons
*/
router.get('/', isAuth, isAdmin, movereasonsController.getIndexMovereasons);


/**
* Return create move reason views
* @name getCreateMovereasons GET
* @function
* @memberof module:routers/movereasons
* @param {string} '/movereasons/create' - uri
* @param {function} movereasonsController.getCreateMovereasons
*/
router.get('/create', isAuth, isAdmin, movereasonsController.getCreateMovereasons);


/**
* Return update move reason views
* @name getUpdateMovereasons GET
* @function
* @memberof module:routers/movereasons
* @param {string} '/movereasons/update/:id' - uri
* @param {function} movereasonsController.getUpdateMovereasons
*/
router.get('/update/:id', isAuth, isAdmin, movereasonsController.getUpdateMovereasons);


/**
* Return delete move reason views
* @name getDeleteMovereasons GET
* @function
* @memberof module:routers/movereasons
* @param {string} '/movereasons/delete/:id' - uri
* @param {function} movereasonsController.getDeleteMovereasons
*/
router.get('/delete/:id', isAuth, isAdmin, movereasonsController.getDeleteMovereasons);


/**
 * Handling post creating move reason's
 * @name postCreateMovereasons POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/movereasons/create' - uri
 * @param {function} movereasonsController.postCreateMovereasons
 */
router.post(
    '/create',
    isAuth,
    isAdmin,
    [
        body('label', 'Raison du déplacement obligatoire')
            .not()
            .isEmpty()
    ],
    movereasonsController.postCreateMovereasons
);


/**
 * Handling post updating move reason's
 * @name postUpdateMovereasons POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/movereasons/update' - uri
 * @param {function} movereasonsController.postUpdateMovereasons
 */
router.post(
    '/update',
    isAuth,
    isAdmin,
    [
        body('label', 'Raison du déplacement obligatoire')
            .not()
            .isEmpty()
    ],
    movereasonsController.postUpdateMovereasons
);


/**
 * Handling post deleting move reason's
 * @name postDeleteMovereasons POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/movereasons/delete' - uri
 * @param {function} movereasonsController.postDeleteMovereasons
 */
router.post('/delete', isAuth, isAdmin, movereasonsController.postDeleteMovereasons);


module.exports = router;