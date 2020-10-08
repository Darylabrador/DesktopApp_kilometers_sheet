/**
 * Create PDF file's header
 * @param {*} doc 
 * @param {string} entity Entity name
 * @param {string} person Person's surname and name
 * @param {string} vehicleType Vehicle Type (Ex : 3 CV and less)
 * @param {string} vehicleYear Vehicle Year (Ex: 2010)
 * @param {string} totalKm Total Kilometers for Kilometers Sheets
 * @param {string} compensation Total compensation for Kilometers Sheets
 */
exports.headerPdf = (doc, entity, person, vehicleType, vehicleYear, totalKm, compensation) => {
    doc.fontSize(10);
    doc
        .font('Helvetica')
        .text(`Entreprise : ${entity}`, 40, 40);
    doc
        .font('Helvetica')
        .text(`Nom : ${person}`);

    doc
        .font('Helvetica')
        .text(`Type de véhicule : ${vehicleType}`);

    doc
        .font('Helvetica')
        .text(`Année du véhicule : ${vehicleYear}`);
    doc
        .font('Helvetica')
        .text(`Total KM parcourus : ${totalKm}`);

    doc
        .font('Helvetica')
        .text(`Montant indéminité : ${compensation} €`);
}


/**
 * Create PDF file's body with pagination
 * @param {*} doc 
 * @param {Number} xEntete coordinates x for header's doc
 * @param {Number} yEntete coordinates y for header's doc
 * @param {Number} xRows coordinates x for data
 * @param {Number} yRows coordinates y for data
 * @param {Array} dateArray date array
 * @param {Array} travelArray travel array
 * @param {Array} reasonArray move reason array (comment to be precise)
 * @param {Array} speedometerStartArray speedometer start array
 * @param {Array} speedometerEndArray speedometer end array
 * @param {Array} distanceArray distance array
 * @param {Number} compteurInitPlage dynamic start's counter for the iteration
 * @param {Number} compteurFinPlage dynamic end's counter for the iteration
 * @param {Number} pageNumber paginate number
 */
exports.corpsPdf = (doc, xEntete, yEntete, xRows, yRows, dateArray, travelArray, reasonArray, speedometerStartArray, speedometerEndArray, distanceArray, compteurInitPlage, compteurFinPlage, pageNumber) => {
    
    // header's table
    let bodyHeaderText = ['Date', 'Trajet', 'Commentaire', 'Compteur départ', 'Compteur arriver', 'Distance']
    for(let i = 0; i < 6; i++){
        doc.lineJoin('miter')
            .rect(xEntete, yEntete, 130, 22)
            .stroke()
            .font('Helvetica-Bold')
            .text(bodyHeaderText[i], xEntete + 10, yEntete + 8);
        xEntete += 130;
    }

    // body's table
    for (let k = compteurInitPlage; k < compteurFinPlage; k++) {
        if (dateArray[k]) {
            var bodyContent = [dateArray[k], travelArray[k], reasonArray[k], speedometerStartArray[k], speedometerEndArray[k], distanceArray[k]];
            for (let l = 0; l < bodyContent.length; l++) {
                doc.fontSize(9);
                doc.lineJoin('miter')
                    .rect(xRows + (130 * l), yRows, 130, 22)
                    .stroke()
                    .font('Helvetica')
                    .text(bodyContent[l], (xRows + 10) + (130 * l), yRows + 10);
            }
            yRows += 22;
        }
    }

    // paginate number
    doc.fontSize(10);
    doc
        .font('Helvetica-Bold')
        .text(pageNumber, 800, 550);
}