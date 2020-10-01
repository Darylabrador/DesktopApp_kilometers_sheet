const express           = require('express');
const displayController = require('../controllers/displayController');
const authController    = require('../controllers/authController');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', displayController.getLogin);

router.get('/dashboard', isAuth, displayController.getDashboard);

router.get('/logout', isAuth, authController.logout);

// router.post('/signup', isAuth, authController.postSignup);


module.exports = router;