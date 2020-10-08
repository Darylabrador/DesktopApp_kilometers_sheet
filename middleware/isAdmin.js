/**
 * Middleware to know if user is an admon
 */
module.exports = (req, res, next) => {
    if (!req.isAdmin) {
        return res.redirect('/dashboard');
    }
    next();
}