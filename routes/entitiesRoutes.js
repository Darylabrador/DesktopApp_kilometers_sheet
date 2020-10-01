const express             = require('express');
const entitiesController  = require('../controllers/entitiesController');
const { body }            = require('express-validator');

// Middleware
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, entitiesController.getIndexEntities);

router.get('/create', isAuth, entitiesController.getCreateEntities);

router.get('/update/:id', isAuth, entitiesController.getUpdateEntities);

router.get('/delete/:id', isAuth, entitiesController.getDeleteEntities);


router.post(
    '/create',
    isAuth,
    [
        body('name', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postCreateEntities
);


router.post(
    '/update',
    isAuth,
    [
        body('name', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postUpdateEntities
);

router.post('/delete', isAuth, entitiesController.postDeleteEntities);

module.exports = router;