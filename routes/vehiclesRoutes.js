const express            = require('express');
const vehiclesController = require('../controllers/vehiclesController');
const { body }           = require('express-validator');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, vehiclesController.getIndexVehicles);

router.get('/create', isAuth, vehiclesController.getCreateVehicles);

router.get('/update/:id', isAuth, vehiclesController.getUpdateVehicles);

router.get('/delete/:id', isAuth, vehiclesController.getDeleteVehicles);

router.get('/associate/liste', isAuth, vehiclesController.getAssociateListVehicles);

router.get('/associate/create', isAuth, vehiclesController.getAssociateCreateVehicles);

router.get('/associate/update/:id', isAuth, vehiclesController.getAssociateUpdateVehicles);

router.get('/associate/delete/:id', isAuth, vehiclesController.getAssociateDeleteVehicles);

router.post(
    '/create',
    isAuth,
    [
        body('mark', 'Veuillez renseigner la maque')
            .not()
            .isEmpty(),
        body('model', 'Veuillez renseigner le modèle')
            .not()
            .isEmpty(),
        body('horsepower', 'Veuillez renseigner la puissance')
            .not()
            .isEmpty()
            .isNumeric(),
        body('year', 'Veuillez renseigner l\'année')
            .not()
            .isEmpty()
            .isNumeric(),
        body('registrationNumber', 'Veuillez renseigner l\'immatriculation')
            .not()
            .isEmpty()
    ],
    vehiclesController.postCreateVehicles
);


router.post(
    '/update',
    isAuth,
    [
        body('mark', 'Veuillez renseigner la maque')
            .not()
            .isEmpty(),
        body('model', 'Veuillez renseigner le modèle')
            .not()
            .isEmpty(),
        body('horsepower', 'Veuillez renseigner la puissance')
            .not()
            .isEmpty()
            .isNumeric(),
        body('year', 'Veuillez renseigner l\'année')
            .not()
            .isEmpty()
            .isNumeric(),
        body('registrationNumber', 'Veuillez renseigner l\'immatriculation')
            .not()
            .isEmpty()
    ],
    vehiclesController.postUpdateVehicles
);

router.post('/delete', isAuth, vehiclesController.postDeleteVehicles);

router.post(
    '/associate/create',
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('vehicleId', 'Veuillez saisir le véhicule')
            .not()
            .isEmpty()
    ],
    vehiclesController.postCreateAssociateVehicles
);

router.post(
    '/associate/update',
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('vehicleId', 'Veuillez saisir le véhicule')
            .not()
            .isEmpty()
    ],
    vehiclesController.postUpdateAssociateVehicles
);

router.post('/associate/delete', isAuth, vehiclesController.postDeleteAssociateVehicles);


module.exports = router;