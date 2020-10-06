const router   = require('express').Router();
const { body } = require('express-validator');

const isAuth   = require('../middleware/is-auth');

const statsController = require('../controllers/statsController');

router.get('/', isAuth, statsController.getStats);

router.get('/details/:id', isAuth, statsController.getStatsDetails);

module.exports = router;