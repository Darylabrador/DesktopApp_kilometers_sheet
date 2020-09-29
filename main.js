const path        = require('path');
const express     = require('express');
const expressApp  = express();
const http        = require('http').Server(expressApp);

// Appel des routes
const authRoutes = require('./routes/authRoute');

/* Initialisation des variables */
const router = {
  isStarted: false
};


/**
 * Démarrer le serveur web
 * @param {*} callback 
 */
function start(callback) {
  if (router.isStarted === false) {
    init(function () {
      loadRoutes(function () {
        /* Lance le serveur web sur le port 3000 */
        http.listen(3000, function () {
          console.log('Application is running on port 3000');
          router.isStarted = true;
          if (typeof callback != 'undefined') {
            callback();
          }
        });
      });
    });
  } else {
    console.log("Application already started");
    if (typeof callback != 'undefined') {
      callback();
    }
  }
}

/**
 * Initialisation du view engine et des paramètres annexe
 * @param {*} callback 
 */
function init(callback) {
  /** view engine setup*/
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'ejs');
  expressApp.use(express.static(path.join(__dirname, 'public')));

  /* On s'assure que le serveur n'est vraiment pas démarré */
  router.isStarted = false;
  if (typeof callback != 'undefined') {
    callback();
  }
}

/**
 * Gestion des routes
 * @param {*} callback 
 */
function loadRoutes(callback) {
  expressApp.get("/", authRoutes);
  if (typeof callback != 'undefined') {
    callback();
  }
}

module.exports = {
  start: start
};