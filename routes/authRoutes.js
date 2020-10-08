/** Auth routes
 * @module routers/auth
 * @requires express express.Router()
 */

const authController = require('../controllers/authController');

const { body } = require('express-validator');

const router = require('express').Router();

/**
 * Handling user's connection
 * @name postLogin POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/login' - uri
 * @param {function} authController.postLogin
 */
router.post(
    '/login',
    [
        body('login', 'Veuillez saisir votre login')
            .not()
            .isEmpty(),
        body('password', 'Au minimum 5 caractères pour le mot de passe')
            .isLength({ min: 5 })
            .trim()
    ],
    authController.postLogin
);

module.exports = router;