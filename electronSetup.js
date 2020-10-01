const path        = require('path');
const express     = require('express');
const expressApp  = express();
const http        = require('http').Server(expressApp);
const database    = require('./config/database');
const session     = require('express-session');
const flash       = require('connect-flash');

// Get all models
const Entities            = require('./models/entities');
const Persons             = require('./models/persons');
const Vehicles            = require('./models/vehicles');
const Horsepowers         = require('./models/horsepowers');
const KilometerSheets     = require('./models/kilometersheets');
const KilometerSheetRows  = require('./models/kilometersheetrows');
const MoveReasons         = require('./models/movereasons');
const PersonsVehicles     = require('./models/personsVehicles');
const PersonsWorkFors     = require('./models/personsworkfors');

// Routes handler
const generalRoutes       = require('./routes/generalRoutes');
const authRoutes          = require('./routes/authRoutes');
const horsepowersRoutes   = require('./routes/horsepowersRoutes');

/* variable initialisation's */
const router = {
  isStarted: false
};


/**
 * Starting web server on port 3000
 * 
 * When we start we create tables in database if not exist
 * @param {*} callback 
 */
function start(callback) {
  if (router.isStarted === false) {
    init(function () {

      // Handle routes function
      loadRoutes(function () {

        // setup relations
        // 1 person can work for many entities
        Persons.belongsToMany(Entities, { through: PersonsWorkFors });
        Entities.belongsToMany(Persons, { through: PersonsWorkFors });

        // 1 person can have many vehicles
        Persons.belongsToMany(Vehicles, {through: PersonsVehicles});
        Vehicles.belongsToMany(Persons, {through: PersonsVehicles});

        // 1 horsepowers can be attribute to many vehicule
        Horsepowers.hasMany(Vehicles);

        // 1 person can have many kilometerSheet
        // 1 Entity can have many kilometerSheet
        // 1 vehicles can have many kilometerSheet
        Persons.hasMany(KilometerSheets);
        Entities.hasMany(KilometerSheets);
        Vehicles.hasMany(KilometerSheets);

        // 1 kilometerSheet can have many kilometersheetrows
        KilometerSheets.hasMany(KilometerSheetRows);

        // 1 kilometersheetrows can have many moveReason
        MoveReasons.hasMany(KilometerSheetRows);

        // database connection and sync
        database
          .sync()
          .then(result => {

            // starting web server
            http.listen(3000, function () {
              console.log('Application is running on port 3000');
              router.isStarted = true;
              if (typeof callback != 'undefined') {
                callback();
              }
            });

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
 * Initialisation of view engine and others parameters
 * @param {*} callback 
 */
function init(callback) {

  /** view engine setup*/
  expressApp.set('views', path.join(__dirname, 'views'));
  expressApp.set('view engine', 'ejs');
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(express.static(path.join(__dirname, 'public')));

  /** middleware setup */
  expressApp.use(
    session({
      name: 'default',
      secret: 'IdHmkkt7KJDJgbnlkejaosOUazV0JdaeasdLKLHdjKJKHEZ65486SFERTqeazae',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        maxAge: 3600 * 1000 * 3
      }
    })
  );

  expressApp.use(flash());

  expressApp.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.error_message   = req.flash('error');
    next();
  });

  /* Keep server down */
  router.isStarted = false;
  if (typeof callback != 'undefined') {
    callback();
  }
}

/**
 * Route's management
 * @param {*} callback 
 */
function loadRoutes(callback) {
  expressApp.use("/", generalRoutes);
  expressApp.use("/", authRoutes);
  expressApp.use("/horsepowers", horsepowersRoutes);
  
  if (typeof callback != 'undefined') {
    callback();
  }
}

module.exports = {
  start: start
};