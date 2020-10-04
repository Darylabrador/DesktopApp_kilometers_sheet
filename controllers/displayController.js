// Get all models



/* --------------- GENERAL GET PAGE --------------- */


/**
 * Get login page
 *
 * Render login page
 * @function getLogin
 * @returns {VIEW} login view
 */
exports.getLogin = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login', {
        backgroundColor: "bg-darkblue-color"
    });
}


/**
 * Get dashboard page
 *
 * Render dashboard page
 * @function getDashboard
 * @returns {VIEW} dashboard view
 */
exports.getDashboard = (req, res, next) => {
    res.render('dashboard', {
        backgroundColor: "bg-lightblue-color"
    });
}