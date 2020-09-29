const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const multer       = require('multer');
const dotenv       = require('dotenv').config();
const session      = require('express-session');
const flash        = require('connect-flash');
const helmet       = require('helmet');

// database info
const database = require('./config/database');

// routes

// error controller 
const errorController = require('./controllers/errorController');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// security middleware
app.use(helmet());
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session handler
app.use(
  session({
    name: 'simple-cookie-name',
    secret: 'P8fSnrPNwkiwd5iGCAdKUd!KEeJHPU2ysQIdiTcUa#DaXjHIBrPi',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 3600 * 3 // 3 hours
    }
  })
);

// handle flash message 
app.use(flash());

// pass variables locally
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success');
  res.locals.error_message   = req.flash('error');
  next();
});

// routes handler


// catch 404 and forward to error handler
app.use(errorController.get404);

// general error handler (all except 404)
app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.httpStatusCode).render('error', {
    title: 'Une erreur est servenue',
    path: '/errors',
    statusCode: error.httpStatusCode
  });
});

module.exports = app;