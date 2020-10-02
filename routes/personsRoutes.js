const express            = require('express');
const personsController  = require('../controllers/personsController');
const { body }           = require('express-validator');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, personsController.getIndexPersons);

router.get('/create', isAuth, personsController.getCreatePersons);

router.get('/update/:id', isAuth, personsController.getUpdatePersons);

router.get('/delete/:id', isAuth, personsController.getDeletePersons);


router.post(
    '/create',
    isAuth,
    [
        body('name', 'Veuillez renseigner le nom')
            .not()
            .isEmpty(),
        body('surname', 'Veuillez renseigner le prénom')
            .not()
            .isEmpty()
    ],
    personsController.postCreatePersons
);


router.post(
    '/update',
    isAuth,
    [
        body('name', 'Veuillez renseigner le nom')
            .not()
            .isEmpty(),
        body('surname', 'Veuillez renseigner le prénom')
            .not()
            .isEmpty()
    ],
    personsController.postUpdatePersons
);

router.post('/delete', isAuth, personsController.postDeletePersons);

module.exports = router;