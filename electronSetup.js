const path        = require('path');
const express     = require('express');
const expressApp  = express();
const http        = require('http').Server(expressApp);
const database    = require('./config/database');
const session     = require('express-session');
const flash       = require('connect-flash');
const bcrypt      = require('bcryptjs');

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
const entitiesRoutes      = require('./routes/entitiesRoutes');
const personsRoutes       = require('./routes/personsRoutes');
const movereasonsRoutes   = require('./routes/movereasonsRoutes');
const vehiclesRoutes      = require('./routes/vehiclesRoutes');
const kilometerRoutes     = require('./routes/kilometerRoutes');
const statsRoutes         = require('./routes/statsRoutes');

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
        PersonsWorkFors.belongsTo(Persons);
        PersonsWorkFors.belongsTo(Entities);

        // 1 person can have many vehicles
        Persons.belongsToMany(Vehicles, {through: PersonsVehicles});
        Vehicles.belongsToMany(Persons, {through: PersonsVehicles});
        PersonsVehicles.belongsTo(Persons);
        PersonsVehicles.belongsTo(Vehicles);

        // 1 horsepowers can be attribute to many vehicule
        Horsepowers.hasMany(Vehicles);
        Vehicles.belongsTo(Horsepowers);
        
        // 1 person can have many kilometerSheet
        // 1 Entity can have many kilometerSheet
        // 1 vehicles can have many kilometerSheet
        Persons.hasMany(KilometerSheets);
        Entities.hasMany(KilometerSheets);
        Vehicles.hasMany(KilometerSheets);
        KilometerSheets.belongsTo(Persons);
        KilometerSheets.belongsTo(Entities);
        KilometerSheets.belongsTo(Vehicles);

        // 1 kilometerSheet can have many kilometersheetrows
        KilometerSheets.hasMany(KilometerSheetRows);
        KilometerSheetRows.belongsTo(KilometerSheets);

        // 1 kilometersheetrows can have many moveReason
        MoveReasons.hasMany(KilometerSheetRows);
        KilometerSheetRows.belongsTo(MoveReasons);
        
        // database connection and sync
        database
          .sync()
          .then(result => {
            return Persons.findOne({ where: {login: 'daryl'} });

          }).then(userExit => {
            if(!userExit) {
              bcrypt.hash('123456', 12).then(hashedPwd => {
                let startedAccount = new Persons({
                  login: 'daryl',
                  password: hashedPwd,
                  name: 'Daryl',
                  surname: 'ABRADOR',
                  role: 'administrator'
                });

                // starting web server after creating test account
                startedAccount.save().then(() => {
                  http.listen(3000, function () {
                    console.log('Application is running on port 3000 after creating account');
                    router.isStarted = true;
                    if (typeof callback != 'undefined') {
                      callback();
                    }
                  });
                });

              })
            } else {

              // starting web server
              http.listen(3000, function () {
                console.log('Application is running on port 3000');
                router.isStarted = true;
                if (typeof callback != 'undefined') {
                  callback();
                }
              });
            }
          })
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
  expressApp.use('/data', express.static(path.join(__dirname, 'data')));

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
    if (!req.session.userId) {
      return next();
    }
    Persons.findByPk(req.session.userId)
      .then(user => {
        if (!user) {
          return next();
        }

        // variables for controllers files
        req.isAdmin                = user.role == 'administrator' ? true : false;
        req.userId                 = user.id;

        // local variables for views
        res.locals.currentUserId   = user._id;
        res.locals.isAuthenticated = req.session.isLoggedIn;
        res.locals.isAdmin         = user.role == 'administrator' ? true : false;
        next();
      })
      .catch(err => {
        next()
      });
  });

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
  expressApp.use("/entities", entitiesRoutes);
  expressApp.use('/persons', personsRoutes);
  expressApp.use('/movereasons', movereasonsRoutes);
  expressApp.use('/vehicles', vehiclesRoutes);
  expressApp.use('/kilometersheets', kilometerRoutes);
  expressApp.use('/stats', statsRoutes);
  
  if (typeof callback != 'undefined') {
    callback();
  }
}

module.exports = {
  start: start
};