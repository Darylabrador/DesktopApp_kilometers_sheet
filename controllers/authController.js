const bcrypt                = require('bcryptjs');

const { validationResult }  = require('express-validator');

const Persons = require('../models/persons'); 

/**
 * Handle post login
 * @function postLogin
 * @param {string} login
 * @param {string} password
 * @returns {VIEW} redirect to '/dashboard'
 * @throws Will redirect to '/' if one error occursed
 */
exports.postLogin = async (req, res, next) => {
    const { login, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/');
    }

    try {
        const personExist = await Persons.findOne({where: {login}});

        if(!personExist) {
            req.flash('error', 'Identifiant ou mot de passe invalide');
            return res.redirect('/');
        }

        const isEqual = await bcrypt.compare(password, personExist.password);

        if (isEqual) {
            req.session.isLoggedIn = true;
            req.session.userId = personExist.id;
            return req.session.save(err => {
                res.redirect('/dashboard');
            });
        };

        req.flash('error', 'Identifiant ou mot de passe invalide');
        return res.redirect('/');
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/');
    }
}

/**
 * Handle logout
 * @function logout
 * @returns {VIEW} redirect to '/'
 */
exports.logout = (req, res, next) => {
    req.session.destroy((err)=> {
        if(err) {
            console.log(err)
        }
        res.redirect('/')
    })
}


