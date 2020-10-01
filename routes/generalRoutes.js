const express           = require('express');
const displayController = require('../controllers/displayController');
const authController    = require('../controllers/authController');
const { body }          = require('express-validator');

const router = express.Router();

router.get('/', displayController.getLogin);

router.get('/dashboard', displayController.getDashboard);

router.get('/logout', authController.logout);

router.post('/signup', authController.postSignup);

module.exports = router;