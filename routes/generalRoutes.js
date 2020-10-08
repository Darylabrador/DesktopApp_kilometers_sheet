/** General routes
 * @module routers/general
 * @requires express express.Router()
 */


const displayController = require('../controllers/displayController');
const authController    = require('../controllers/authController');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();

/**
 * Return login view
 * @name getLogin GET
 * @function
 * @memberof module:routers/general
 * @param {string} '/' - uri
 * @param {function} displayController.getLogin
 */
router.get('/', displayController.getLogin);


/**
 * Return dashboard view
 * @name getDashboard GET
 * @function
 * @memberof module:routers/general
 * @param {string} '/dashboard' - uri
 * @param {function} displayController.getDashboard
 */
router.get('/dashboard', isAuth, displayController.getDashboard);


/**
 * Handle the user's disconnect
 * @name logout GET
 * @function
 * @memberof module:routers/general
 * @param {string} '/logout' - uri
 * @param {function} displayController.logout
 */
router.get('/logout', isAuth, authController.logout);

module.exports = router;