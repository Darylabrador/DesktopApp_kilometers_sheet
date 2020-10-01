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

    try {
        const horsepowersInfo = await Horsepowers.findByPk({where: {id}});
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
        const horsepowersInfo = await Horsepowers.findByPk({ where: { id } });

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

}


/**
 * Handle post update horsepowers
 *
 * @function postUpdateHorsepowers
 * @returns {VIEW} redirect to '/horsepowers/update/:id'
 * @throws Will throw an error if one error occursed
 */
exports.postUpdateHorsepowers = async (req, res, next) => {

}


/**
 * Handle post delete horsepowers
 *
 * @function postDeleteHorsepowers
 * @returns {VIEW} redirect to '/horsepowers'
 * @throws Will throw an error if one error occursed
 */
exports.postDeleteHorsepowers = async (req, res, next) => {

}