/** Stats routes
 * @module routers/stats
 * @requires express express.Router()
 */

const router   = require('express').Router();

const isAuth   = require('../middleware/is-auth');
const isAdmin = require('../middleware/isAdmin');

const statsController = require('../controllers/statsController');

/**
* Return datatable views with all global stats
* @name getStats GET
* @function
* @memberof module:routers/auth
* @param {string} '/stats' - uri
* @param {function} statsController.getStats
*/
router.get('/', isAuth, isAdmin,statsController.getStats);


/**
* Return datatable views with all detailled stats
* @name getStats GET
* @function
* @memberof module:routers/auth
* @param {string} '/stats' - uri
* @param {function} statsController.getStats
*/
router.get('/details/:id', isAuth, isAdmin,statsController.getStatsDetails);

module.exports = router;