const express              = require('express');
const kilometersController = require('../controllers/kilometersController');
const { body }             = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, kilometersController.getIndexKilometerSheets);

router.get('/create', isAuth, kilometersController.getCreateKilometerSheets);

router.get('/update/:id', isAuth, kilometersController.getUpdateKilometerSheets);

router.get('/export/:id', isAuth, kilometersController.exportSheets);

router.get('/reasonselect', isAuth, kilometersController.getMovereason);

router.get('/delete/:id', isAuth, kilometersController.getDeleteKilometerSheets);

router.post(
    '/create',
    isAuth,
    [
        body('entityId', 'Veuillez renseigner l\'entité')
            .not()
            .isEmpty(),
        body('vehicleId', 'Veuillez renseigner le véhicule')
            .not()
            .isEmpty(),
    ],
    kilometersController.postCreateKilometerSheets
);

router.post('/addrows', isAuth, kilometersController.postAddRowKilometerSheets)

router.post('/delete', isAuth, kilometersController.postDeleteKilometerSheets)

module.exports = router;