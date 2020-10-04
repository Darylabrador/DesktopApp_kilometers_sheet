const express              = require('express');
const kilometersController = require('../controllers/kilometersController');
const { body }             = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, kilometersController.getIndexKilometerSheets);

router.get('/create', isAuth, kilometersController.getCreateKilometerSheets);

router.get('/update/:id', isAuth);

router.get('/export/:id', isAuth);

router.get('/delete/:id', isAuth);


router.post(
    '/create',
    isAuth,
    [
        body('field', 'message')
            .not()
            .isEmpty(),
    ]
);

module.exports = router;