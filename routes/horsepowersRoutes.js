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


router.post(
    '/create', 
    isAuth, 
    [
        body('label', 'Veuillez saisir la description')
            .not()
            .isEmpty(),
        body('case1', "Aucune valeur : Jusqu'à 5 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
        body('case2', "Aucune valeur : De 5 001 km à 20 000 km")
            .not()
            .isEmpty(),
        body('case3', "Aucune valeur : Au-delà de 20 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
    ],
    horsepowersController.postCreateHorsepowers
);


router.post(
    '/update',
    isAuth,
    [
        body('label', 'Veuillez saisir la description')
            .not()
            .isEmpty(),
        body('case1', "Aucune valeur : Jusqu'à 5 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
        body('case2', "Aucune valeur : De 5 001 km à 20 000 km")
            .not()
            .isEmpty(),
        body('case3', "Aucune valeur : Au-delà de 20 000 km")
            .not()
            .isEmpty()
            .isNumeric(),
    ],
    horsepowersController.postUpdateHorsepowers
);


router.post('/delete', isAuth, horsepowersController.postDeleteHorsepowers);

module.exports = router;