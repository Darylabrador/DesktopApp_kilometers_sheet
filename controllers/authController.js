const bcrypt                = require('bcryptjs');
const { validationResult }  = require('express-validator');

const Persons = require('../models/persons'); 


/**
 * Handle post login
 *
 * @function postLogin
 * @returns {VIEW} redirect to '/dashboard'
 * @throws Will throw an error if one error occursed
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
            req.session.userId = personExist._id;
            return req.session.save(err => {
                res.redirect('/dashboard');
            });
        };
    } catch (error) {
        console.log(error)
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/');
    }
}



/**
 * Handle post signup 
 *
 * @function postSignup
 * @returns {VIEW} redirect to '/persons'
 * @throws Will throw an error if one error occursed
 */
exports.postSignup = async (req, res, next) => {
    const { login, password, name, surname, role } = req.body;

    try {
        if (role == 'administrator' || role == 'guest') {
            const hashedPwd = await bcrypt.hash(password, 12);

            const newPerson = new Persons({
                login,
                password: hashedPwd,
                name,
                surname,
                role
            });

            await newPerson.save();
            return console.log('create')
        }
        return console.log('role incorrecte')
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * Handle logout
 *
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


