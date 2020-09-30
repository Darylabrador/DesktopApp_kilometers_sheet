const bcrypt                = require('bcryptjs');
const { validationResult }  = require('express-validator');

const Persons = require('../models/persons'); 

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
            req.session.userId = personExist._id;
            return req.session.save(err => {
                res.redirect('/dashboard');
            });
        };
    } catch (error) {
        console.log(error)
    }
}