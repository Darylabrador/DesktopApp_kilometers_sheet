const { validationResult } = require('express-validator');

// Models
const Entities      = require('../models/entities');
const Persons       = require('../models/persons');
const Peronsworkfor = require('../models/personsworkfors');

/* --------------- ALL GET PAGE ABOUT V --------------- */

/**
 * Get index entities page
 *
 * Render index entities page
 * @function getIndexEntities
 * @returns {VIEW} index entities view
 */
exports.getIndexEntities = async (req, res, next) => {
    try {
        const entitiesInfo = await Entities.findAll();
        res.render('entities/index', {
            backgroundColor: "bg-lightblue-color",
            entitiesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}


/**
 * Get create entities page
 *
 * Render create entities page
 * @function getCreateEntities
 * @returns {VIEW} create entities view
 */
exports.getCreateEntities = (req, res, next) => {
    res.render('entities/create', {
        backgroundColor: "bg-lightblue-color"
    });
}


/**
 * Get update entities page
 *
 * Render update entities page
 * @function getUpdateEntities
 * @returns {VIEW} update entities view
 */
exports.getUpdateEntities = async (req, res, next) => {
    const id = req.params.id;

    try {
        const entitiesInfo = await Entities.findByPk(id);
        if (!entitiesInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/entities');
        }

        res.render('entities/update', {
            backgroundColor: "bg-lightblue-color",
            entitiesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }

}

/**
 * Get delete entities page
 *
 * Render delete entities page
 * @function getDeleteEntities
 * @returns {VIEW} delete entities view
 */
exports.getDeleteEntities = async (req, res, next) => {
    const id = req.params.id;

    try {
        const entitiesInfo = await Entities.findByPk(id);

        if (!entitiesInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/entities');
        }

        res.render('entities/delete', {
            backgroundColor: "bg-lightblue-color",
            entitiesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}


/* --------------- ALL POST PAGE ABOUT ENTITIES --------------- */


/**
 * Handle post create entities
 *
 * @function postCreateEntities
 * @returns {VIEW} redirect to '/entities'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateEntities = async (req, res, next) => {
    const { name, type } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/entities/create');
    }

    try {
        if (type == 'entreprise' || type == 'association') {
            const newEntity = new Entities({ name, type });
            await newEntity.save();
            req.flash('success', 'Création effectuer !');
            return res.redirect('/entities');
        }
        req.flash('error', 'Type invalide');
        return res.redirect('/entities/create');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}


/**
 * Handle post update entities
 *
 * @function postUpdateEntities
 * @returns {VIEW} redirect to '/entities/update'
 * @throws Will throw an error if one error occursed
 */
exports.postUpdateEntities = async (req, res, next) => {
    const { entitiesId, name, type } = req.body;

    try {
        const entitiesRow = await Entities.findByPk(entitiesId);
        if (!entitiesRow) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/entities');
        }

        if (type == 'entreprise' || type == 'association') {
            entitiesRow.name = name;
            entitiesRow.type = type;
            await entitiesRow.save();
            req.flash('success', 'Mise à jour effectuer !');
            return res.redirect('/entities');
        }

        req.flash('error', 'Type invalide');
        return res.redirect(`/entities/update/${entitiesId}`);
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}



/**
 * Handle post delete entities
 *
 * @function postDeleteEntities
 * @returns {VIEW} redirect to '/entities'
 * @throws Will throw an error if one error occursed
 */
exports.postDeleteEntities = async (req, res, next) => {
    const { entitiesId } = req.body;
    try {
        const entitiesRow = await Entities.findByPk(entitiesId);
        if (!entitiesRow) {
            req.flash('error', 'Element introuvable !');
            return res.redirect('/entities');
        }
        await entitiesRow.destroy();
        req.flash('success', 'Suppression effectuer !');
        return res.redirect('/entities');
    } catch (error) {
        console.log(error)
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}


/* --------------- ALL ASSOCIATE PAGE ABOUT ENTITIES --------------- */

/**
 * Get associate liste for entities
 *
 * Render associate liste for entities
 * @function getAssociateListEntities
 * @returns {VIEW} associate liste entities view
 */
exports.getAssociateListEntities = async (req, res, next) => {
    try {
        res.render('entities/associateListe', {
            backgroundColor: "bg-lightblue-color", 
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}


/**
 * Get create associate for entities
 *
 * Render create associate for entities
 * @function getAssociateCreateEntities
 * @returns {VIEW} create associate entities view
 */
exports.getAssociateCreateEntities = (req, res, next) => {
    res.render('entities/associateCreate', {
        backgroundColor: "bg-lightblue-color"
    });
}


/**
 * Get update associate for entities
 *
 * Render update associate entities
 * @function getAssociateUpdateEntities
 * @returns {VIEW} update associate entities view
 */
exports.getAssociateUpdateEntities = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.render('entities/associateUpdate', {
            backgroundColor: "bg-lightblue-color",
            entitiesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities/associate/liste');
    }

}

/**
 * Get delete associate entities 
 *
 * Render delete associate entities
 * @function getAssociateDeleteEntities
 * @returns {VIEW} delete associate entities view
 */
exports.getAssociateDeleteEntities = async (req, res, next) => {
    const id = req.params.id;

    try {
        res.render('entities/associateDelete', {
            backgroundColor: "bg-lightblue-color",
            entitiesInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities/associate/liste');
    }
}

/**
 * Handle post create entities associate
 *
 * @function postCreateAssociateEntities
 * @returns {VIEW} redirect to '/entities/associate/liste'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateAssociateEntities = async (req, res, next) => {
    const {  } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/entities/associate/create');
    }

    try {

    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities/associate/liste');
    }
}


/**
 * Handle post update associate entities
 *
 * @function postUpdateAssociateEntities
 * @returns {VIEW} redirect to '/entities/associate/liste'
 * @throws Will throw an error if one error occursed
 */
exports.postUpdateAssociateEntities = async (req, res, next) => {
    const {  } = req.body;

    try {

    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}



/**
 * Handle post delete associate entities
 *
 * @function postDeleteAssociateEntities
 * @returns {VIEW} redirect to '/entities/associate/liste'
 * @throws Will throw an error if one error occursed
 */
exports.postDeleteAssociateEntities = async (req, res, next) => {
    const {  } = req.body;
    try {

    } catch (error) {
        console.log(error)
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/entities');
    }
}