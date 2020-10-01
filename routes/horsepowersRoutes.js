const express                   = require('express');
const horsepowersController    = require('../controllers/horsepowersController');
const { body }                  = require('express-validator');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, horsepowersController.getIndexHorsepowers);

router.get('/create', isAuth, horsepowersController.getCreateHorsepowers);

router.get('/update/:id', isAuth, horsepowersController.getUpdateHorsepowers);

router.get('/delete/:id', isAuth, horsepowersController.getDeleteHorsepowers);

module.exports = router;