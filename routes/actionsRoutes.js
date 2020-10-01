const express = require('express');
const displayController = require('../controllers/displayController');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

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