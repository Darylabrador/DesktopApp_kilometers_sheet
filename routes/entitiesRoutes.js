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

router.get('/associate/liste', isAuth, entitiesController.getAssociateListEntities);

router.get('/associate/create', isAuth, entitiesController.getAssociateCreateEntities);

router.get('/associate/update/:id', isAuth, entitiesController.getAssociateUpdateEntities);

router.get('/associate/delete/:id', isAuth, entitiesController.getAssociateDeleteEntities);

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


router.post(
    '/associate/create',
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('entitiesId', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postCreateAssociateEntities
);

router.post(
    '/associate/update', 
    isAuth,
    [
        body('individuId', 'Veuillez renseigner l\'individu')
            .not()
            .isEmpty(),
        body('entitiesId', 'Veuillez saisir le nom de l\'entité')
            .not()
            .isEmpty()
    ],
    entitiesController.postUpdateAssociateEntities
);

router.post('/associate/delete', isAuth, entitiesController.postDeleteAssociateEntities);

module.exports = router;