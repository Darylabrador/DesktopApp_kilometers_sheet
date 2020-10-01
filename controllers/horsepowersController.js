const { validationResult } = require('express-validator');

// Models
const Horsepowers = require('../models/horsepowers');


/* --------------- ALL GET PAGE ABOUT HORSEPOWERS --------------- */


/**
 * Get index horsepowers page
 *
 * Render index horsepowers page
 * @function getIndexHorsepowers
 * @returns {VIEW} index horsepowers view
 */
exports.getIndexHorsepowers = async (req, res, next) => {
    try {
        const horsepowersInfo = await Horsepowers.findAll();
        res.render('horsepowers/index', {
            backgroundColor: "bg-lightblue-color",
            horsepowersInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }
}


/**
 * Get create horsepowers page
 *
 * Render create horsepowers page
 * @function getCreateHorsepowers
 * @returns {VIEW} create horsepowers view
 */
exports.getCreateHorsepowers = (req, res, next) => {
    res.render('horsepowers/create', {
        backgroundColor: "bg-lightblue-color"
    });
}


/**
 * Get update horsepowers page
 *
 * Render update horsepowers page
 * @function getUpdateHorsepowers
 * @returns {VIEW} update horsepowers view
 */
exports.getUpdateHorsepowers = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    try {
        const horsepowersInfo = await Horsepowers.findByPk(id);
        if (!horsepowersInfo){
            req.flash('error', 'Element introuvable');
            return res.redirect('/horsepowers');
        }
      
        res.render('horsepowers/update', {
            backgroundColor: "bg-lightblue-color",
            horsepowersInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }

}

/**
 * Get delete horsepowers page
 *
 * Render delete horsepowers page
 * @function getDeleteHorsepowers
 * @returns {VIEW} delete horsepowers view
 */
exports.getDeleteHorsepowers = async (req, res, next) => {
    const id = req.params.id;

    try {
        const horsepowersInfo = await Horsepowers.findByPk(id);

        if (!horsepowersInfo) {
            req.flash('error', 'Element introuvable');
            return res.redirect('/horsepowers');
        }

        res.render('horsepowers/delete', {
            backgroundColor: "bg-lightblue-color",
            horsepowersInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }
}


/* --------------- ALL POST PAGE ABOUT HORSEPOWERS --------------- */


/**
 * Handle post create horsepowers
 *
 * @function postCreateHorsepowers
 * @returns {VIEW} redirect to '/horsepowers'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateHorsepowers = async (req, res, next) => {
    const { label, case1, case2, case3 } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/horsepowers/create');
    }

    try {
        const newHorspowerRow = new Horsepowers({ label, case1, case2, case3 });
        await newHorspowerRow.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect('/horsepowers');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }
}


/**
 * Handle post update horsepowers
 *
 * @function postUpdateHorsepowers
 * @returns {VIEW} redirect to '/horsepowers/update/:id'
 * @throws Will throw an error if one error occursed
 */
exports.postUpdateHorsepowers = async (req, res, next) => {
    const { horsepowersId, label, case1, case2, case3 } = req.body;

    try {
        const horsepowerRow = await Horsepowers.findByPk(horsepowersId);
        if (!horsepowerRow){
            req.flash('error', 'Element introuvable');
            return res.redirect('/horsepowers');
        }

        horsepowerRow.label = label;
        horsepowerRow.case1 = case1;
        horsepowerRow.case2 = case2;
        horsepowerRow.case3 = case3;
        await horsepowerRow.save();

        req.flash('success', 'Mise à jour effectuer !');
        return res.redirect('/horsepowers');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }
}



/**
 * Handle post delete horsepowers
 *
 * @function postDeleteHorsepowers
 * @returns {VIEW} redirect to '/horsepowers'
 * @throws Will throw an error if one error occursed
 */
exports.postDeleteHorsepowers = async (req, res, next) => {
    try {
        const horsepowerRow = await Horsepowers.findByPk(horsepowersId);
        await horsepowerRow.destroy();
        req.flash('success', 'Suppression effectuer !');
        return res.redirect('/horsepowers');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/horsepowers');
    }
}