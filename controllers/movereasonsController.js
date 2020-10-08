const { validationResult } = require('express-validator');

// Models
const Movereasons = require('../models/movereasons');


/* --------------- ALL GET PAGE ABOUT MOVEREASONS --------------- */

/**
 * Get index movereasons page
 *
 * Render index movereasons page
 * @function getIndexMovereasons
 * @returns {VIEW} index movereasons view
 */
exports.getIndexMovereasons = async (req, res, next) => {
    try {
        const movereasonsInfo = await Movereasons.findAll();
        res.render('movereasons/index', {
            backgroundColor: "bg-lightblue-color",
            movereasonsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/dashboard');
    }
}


/**
 * Get create movereasons page
 *
 * Render create movereasons page
 * @function getCreateMovereasons
 * @returns {VIEW} create movereasons view
 */
exports.getCreateMovereasons = (req, res, next) => {
    res.render('movereasons/create', {
        backgroundColor: "bg-lightblue-color"
    });
}


/**
 * Get update movereasons page
 *
 * Render update movereasons page
 * @function getUpdateMovereasons
 * @returns {VIEW} update movereasons view
 */
exports.getUpdateMovereasons = async (req, res, next) => {
    const id = req.params.id;

    try {
        const movereasonsInfo = await Movereasons.findByPk(id);
        if (!movereasonsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/movereasons');
        }

        res.render('movereasons/update', {
            backgroundColor: "bg-lightblue-color",
            movereasonsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/movereasons');
    }

}

/**
 * Get delete movereasons page
 *
 * Render delete movereasons page
 * @function getDeleteMovereasons
 * @returns {VIEW} delete movereasons view
 */
exports.getDeleteMovereasons = async (req, res, next) => {
    const id = req.params.id;

    try {
        const movereasonsInfo = await Movereasons.findByPk(id);

        if (!movereasonsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/movereasons');
        }

        res.render('movereasons/delete', {
            backgroundColor: "bg-lightblue-color",
            movereasonsInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/movereasons');
    }
}


/* --------------- ALL POST PAGE ABOUT MOVEREASONS --------------- */


/**
 * Handle post create movereasons
 *
 * @function postCreateMovereasons
 * @returns {VIEW} redirect to '/movereasons'
 * @throws Will redirect to /movereasons if one error occursed
 */
exports.postCreateMovereasons = async (req, res, next) => {
    const { label } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/movereasons/create');
    }

    try {
        const newMovereasons = new Movereasons({ label });
        await newMovereasons.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect('/movereasons');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/movereasons');
    }
}


/**
 * Handle post update movereasons
 *
 * @function postUpdateMovereasons
 * @returns {VIEW} redirect to '/movereasons'
 * @throws Will redirect to /movereasons if one error occursed
 */
exports.postUpdateMovereasons = async (req, res, next) => {
    const { movereasonsId, label } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect(`/movereasons/update/${movereasonsId}`);
    }

    try {
        const movereasonsInfo = await Movereasons.findByPk(movereasonsId);
        if (!movereasonsInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/movereasons');
        }

        movereasonsInfo.label = label;
        await movereasonsInfo.save();
        req.flash('success', 'Mise à jour effectuer !');
        return res.redirect('/movereasons');
        
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/movereasons');
    }
}



/**
 * Handle post delete movereasons
 *
 * @function postDeleteMovereasons
 * @returns {VIEW} redirect to '/movereasons'
 * @throws Will redirect to /movereasons if one error occursed
 */
exports.postDeleteMovereasons = async (req, res, next) => {
    const { movereasonsId } = req.body;
    try {
        const movereasonsInfo = await Movereasons.findByPk(movereasonsId);
        if (!movereasonsInfo) {
            req.flash('error', 'Element introuvable !');
            return res.redirect('/movereasons');
        }
        await movereasonsInfo.destroy();
        req.flash('success', 'Suppression effectuer !');
        return res.redirect('/movereasons');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/movereasons');
    }
}