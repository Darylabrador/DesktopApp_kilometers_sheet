const express           = require('express');
const displayController = require('../controllers/displayController');
const authController    = require('../controllers/authController');
const { body }          = require('express-validator');

const router = express.Router();

router.get('/', displayController.getLogin);

router.post(
    '/login', 
    [
        body('login', 'Veuillez saisir votre login')
            .not()
            .isEmpty(),
        body('password', 'Veuillez saisir un mot de passe contenant au minimum 5 caractères')
            .isLength({ min: 5 })
            .trim()
    ],
    authController.postLogin);

module.exports = router;