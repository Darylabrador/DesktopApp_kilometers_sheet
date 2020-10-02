const express               = require('express');
const movereasonsController = require('../controllers/movereasonsController');
const { body }              = require('express-validator');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, movereasonsController.getIndexMovereasons);

router.get('/create', isAuth, movereasonsController.getCreateMovereasons);

router.get('/update/:id', isAuth, movereasonsController.getUpdateMovereasons);

router.get('/delete/:id', isAuth, movereasonsController.getDeleteMovereasons);


router.post(
    '/create',
    isAuth,
    [
        body('label', 'Raison du déplacement obligatoire')
            .not()
            .isEmpty()
    ],
    movereasonsController.postCreateMovereasons
);


router.post(
    '/update',
    isAuth,
    [
        body('label', 'Raison du déplacement obligatoire')
            .not()
            .isEmpty()
    ],
    movereasonsController.postUpdateMovereasons
);

router.post('/delete', isAuth, movereasonsController.postDeleteMovereasons);

module.exports = router;