const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

/**
 * Get login page
 * 
 * Render the login page
 * @function getLogin
 * @returns {VIEW} login view
 * @throws Will throw an error if one error occursed
 */
exports.getLogin = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('auth/login', {
        title: "Connexion",
        path: '',
        errorMessage: null,
        hasError: false,
        validationErrors: [],
        page: 'login'
    });
};

/**
 * Get signup page
 *
 * Render the signup page
 * @function getSignup
 * @returns {VIEW} signup view
 * @throws Will throw an error if one error occursed
 */
exports.getSignup = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('auth/signup', {
        title: "Inscription",
        path: '',
        errorMessage: null,
        hasError: false,
        validationErrors: [],
        page: 'signup'
    });
};

/**
 * Handle logout
 *
 * @function logout
 * @returns {VIEW} redirect to '/login'
 */
exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};