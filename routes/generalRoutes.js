const express           = require('express');
const displayController = require('../controllers/displayController');

const router = express.Router();

router.get('/', displayController.getLogin);

router.post('/login', displayController.postLogin);

module.exports = router;