const fs                   = require('fs');
const path                 = require('path');

const { validationResult } = require('express-validator');
const PDFDocument          = require('pdfkit');

const Entities            = require('../models/entities');
const Persons             = require('../models/persons');
const Vehicles            = require('../models/vehicles');
const KilometerSheets     = require('../models/kilometersheets');
const KilometerSheetRows  = require('../models/kilometersheetrows');
const MoveReasons         = require('../models/movereasons');
const PersonsVehicles     = require('../models/personsVehicles');
const PersonsWorkFors     = require('../models/personsworkfors');
const KilometerSheetsRows = require('../models/kilometersheetrows');
const Horsepowers         = require('../models/horsepowers');

const pdfFunction         = require('../utils/pdfgenerator');


/* --------------- ALL GET PAGE ABOUT KILOMETERS SHEETS  --------------- */


/**
 * Get index kilometerSheet page
 *
 * Render index kilometerSheet page
 * @function getIndexKilometerSheets
 * @returns {VIEW} index kilometerSheet view
 */
exports.getIndexKilometerSheets = async (req, res, next) => {
    try {
        const kilometerSheetInfo = await KilometerSheets.findAll({
            where: { personId: req.userId },
            include: [Persons, Vehicles, Entities]
        });
        res.render('kilometersheets/index', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/**
 * Get create kilometerSheet page
 *
 * Render create kilometerSheet page
 * @function getCreateKilometerSheets
 * @returns {VIEW} create kilometerSheet view
 */
exports.getCreateKilometerSheets = async (req, res, next) => {
    try {
        const personsVehiclesInfo = await PersonsVehicles.findAll({
            where: { personId: req.userId},
            include: [Persons, Vehicles]
        });

        const personsWorkForInfo = await PersonsWorkFors.findAll({
            where: { personId: req.userId},
            include: [Persons, Entities]
        });

        return res.render('kilometersheets/create', {
            backgroundColor: "bg-darkblue-color",
            personsVehiclesInfo, personsWorkForInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/**
 * Get update kilometerSheet page
 *
 * Render update kilometerSheet page
 * @function getUpdateKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.getUpdateKilometerSheets = async (req, res, next) => {
    const id = req.params.id;
  
    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { personId: req.userId, id },
            include: [Persons, Vehicles, Entities]
        });

        if (!kilometerSheetInfo) {
            req.flash('error', 'Fiche introuvable');
            return res.redirect('/kilometersheets');
        }

        const horsepowersInfo = await Vehicles.findOne({
            where: { id: kilometerSheetInfo.vehicle.id },
            include: [ Horsepowers ] 
        });

        const kilometerSheetRowsInfo = await KilometerSheetRows.findAll({
            where: { kilometerSheetId: id},
            include: [MoveReasons]
        });

        const movereasonList = await MoveReasons.findAll();

        var sheetTitle = "";

        if (kilometerSheetInfo.fileExist) {
            let title = kilometerSheetInfo.entity.name.split(' ');
            if (title.length > 0) {
                for (let i = 0; i < (title.length - 1); i++) {
                    sheetTitle += `${title[i]}_`;
                }
                sheetTitle += `${title[title.length - 1]}_${kilometerSheetInfo.id}.pdf`
            } else {
                sheetTitle = `${kilometerSheetInfo.entity.name}_${kilometerSheetInfo.id}.pdf`;
            }
        }

        res.render('kilometersheets/update', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo, 
            kilometerSheetRowsInfo,
            horsepowersInfo,
            movereasonList,
            sheetTitle
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}



/**
 * Get select info about movereason kilometerSheet page
 *
 * @function getMovereason
 * @returns {JSON}
 */
exports.getMovereason = async (req, res, next) => {
    try {
        const selectInfo = await MoveReasons.findAll();
        res.status(200).json({
            selectField: selectInfo
        })
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/**
 * Get delete kilometerSheet page
 *
 * Render delete kilometerSheet page
 * @function getDeleteKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.getDeleteKilometerSheets = async (req, res, next) => {
    const id = req.params.id;

    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { personId: req.userId, id },
            include: [Persons, Vehicles, Entities]
        });

        if(!kilometerSheetInfo){
            req.flash('error', 'Fiche introuvable');
            return res.redirect('/kilometersheets');
        }

        res.render('kilometersheets/delete', {
            backgroundColor: "bg-lightblue-color",
            kilometerSheetInfo
        });
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/* --------------- ALL POST PAGE ABOUT KILOMETERS SHEETS --------------- */


/**
 * Handle post create kilometerSheet
 *
 * @function postCreateKilometerSheets
 * @returns {VIEW} redirect to '/kilometersheets/:id'
 * @throws Will throw an error if one error occursed
 */
exports.postCreateKilometerSheets = async (req, res, next) => {
    const { entityId, vehicleId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/kilometersheets/create');
    }

    try {
        const entityExist  = await Entities.findByPk(entityId);
        const vehicleExist = await Vehicles.findByPk(vehicleId);

        if(!entityExist) {
            req.flash('error', 'Entité inexistante');
            return res.redirect(`/kilometersheets`); 
        }

        if (!vehicleExist) {
            req.flash('error', 'Véhicule inexistante');
            return res.redirect(`/kilometersheets`); 
        }

        const newSheet = new KilometerSheets({ 
            personId: req.userId,
            entityId, vehicleId
        });

        const newSheetSaved = await newSheet.save();
        req.flash('success', 'Création effectuer !');
        return res.redirect(`/kilometersheets/update/${newSheetSaved.id}`);
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect(`/kilometersheets`);
    }
}




/**
 * Handle post add row to kilometerSheet info
 *
 * @function postAddRowKilometerSheets
 * @returns {JSON}
 */
exports.postAddRowKilometerSheets = async (req, res, next) => {
    const { 
        kilometersheetId, 
        infoTotalKmInfo, 
        infoCompensationInfo,
        dateRowArray,
        travelRowArray,
        reasonRowArray,
        speedometerStartArray,
        speedometerEndArray,
        distanceArray
    } = req.body;

    try {

        const kilometerSheetInfo = await KilometerSheets.findByPk(kilometersheetId);

        if (!kilometerSheetInfo){
            return res.json({
                success: false,
                message: 'Fiche introuvable'
            });
        }

        kilometerSheetInfo.totalKilometer = infoTotalKmInfo;
        kilometerSheetInfo.compensation   = infoCompensationInfo;
        kilometerSheetInfo.fileExist      = false;
        await kilometerSheetInfo.save();

        await KilometerSheetRows.destroy({ 
            where: { kilometerSheetId: kilometersheetId}
        });

        for (let i = 0; i < dateRowArray.length; i++){
            const newRow = new KilometerSheetRows({
                date: dateRowArray[i],
                travel: travelRowArray[i],
                speedometerStart: speedometerStartArray[i],
                speedometerEnd: speedometerEndArray[i],
                distance: distanceArray[i],
                moveReasonId: reasonRowArray[i],
                kilometerSheetId: kilometersheetId
            });
            await newRow.save();
        }
        
        return res.status(200).json({
            success: true,
            message: 'Mise à jour effectué !'
        });
    } catch (error) {
        return res.json({
            success: false,
            message: 'Une erreur est survenue'
        });
    }
}



/**
 * Handle post delete kilometerSheet info
 *
 * @function postDeleteKilometerSheets
 * @returns {VIEW} delete kilometerSheet view
 */
exports.postDeleteKilometerSheets = async (req, res, next) => {
    const { kilometersheetId } = req.body;

    try {
        const kilometerSheetInfo = await KilometerSheets.findOne({
            where: { 
                personId: req.userId, 
                id: kilometersheetId
            },
        });

        if (!kilometerSheetInfo){
            req.flash('error', 'Fiche inexistante');
            return res.redirect(`/kilometersheets`);
        }

        await KilometerSheetsRows.destroy({ where: { kilometerSheetId: kilometersheetId } });
        await kilometerSheetInfo.destroy();

        req.flash('success', 'Suppression effectuer !');
        return res.redirect(`/kilometersheets`);
    } catch (error) {
        req.flash('error', 'Une erreur est survenue');
        return res.redirect('/kilometersheets');
    }
}


/*  ---------------------  EXPORT SHEET INFO TO FILE  --------------------- */


/**
 * Create kilometerSheet PDF
 *
 * @function createPdfSheets
 */
exports.createPdfSheets = async (req, res, next) => {
    const {id} = req.body;
    try {
        const updatedSheet = await KilometerSheets.findByPk(id);
        updatedSheet.fileExist = true;
        await updatedSheet.save();

        const infoSheet = await KilometerSheets.findOne({
            where: {id},
            include: [
                { model: Entities },
                { model: KilometerSheetsRows},
                { 
                    model: Vehicles,
                    include: [{model: Horsepowers}]
                },
                {
                    model: Persons,
                    attributes: ['surname', 'name']
                }
            ]
        });
    

        // Define sheet title
        let title      = infoSheet.entity.name.split(' ');
        let sheetTitle = "";

        if (title.length > 0) {
            for (let i = 0; i < (title.length - 1); i++) {
                sheetTitle += `${title[i]}_`;
            }
            sheetTitle += `${title[title.length - 1]}_${infoSheet.id}.pdf`
        } else {
            sheetTitle = `${infoSheet.entity.name}_${infoSheet.id}.pdf`;
        }

        const sheetPath = path.join('data', sheetTitle);

        // Create pdf file
        const doc = new PDFDocument({
            size: 'A4',
            layout: 'landscape',
            autoFirstPage: false
        });

        doc.pipe(fs.createWriteStream(sheetPath).on('close', () => {
            req.flash('success', 'Génération réussi !')
            res.redirect(`/kilometersheets/update/${id}`);
            doc.pipe(res);
        }));


        let xEntete = 35;
        let yEntete = 120;

        /*
        var compteurInitPlage = 0;
        var compteurFinPlage  = 5;

        for (let i = 0; i < infoSheet.kilometerSheetsRows.length; i++){
            doc.addPage();

            // create header docs
            pdfFunction.headerPdf(
                doc,
                infoSheet.entity.name,
                `${infoSheet.person.surname} ${infoSheet.person.name}`,
                infoSheet.vehicle.horsepower.label,
                infoSheet.vehicle.year,
                infoSheet.totalKilometer,
                infoSheet.compensation
            );

            // create body pdf
            compteurInitPlage += 5;
            compteurFinPlage  += 5;
        }

        */


        doc.addPage();

        // create header docs
        pdfFunction.headerPdf(
            doc,
            infoSheet.entity.name,
            `${infoSheet.person.surname} ${infoSheet.person.name}`,
            infoSheet.vehicle.horsepower.label,
            infoSheet.vehicle.year,
            infoSheet.totalKilometer,
            infoSheet.compensation
        );

        pdfFunction.corpsPdf(doc, xEntete, yEntete, infoSheet.kilometerSheetsRows);

        doc.end();

    } catch (error) {
        console.log(error)

        req.flash('error', 'Une erreur est survenue');
        return res.redirect(`/kilometersheets/update/${id}`);
    }
}