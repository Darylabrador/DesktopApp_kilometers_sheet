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



exports.corpsPdf = (doc, xEntete, yEntete, xRows, yRows, dateArray, travelArray, reasonArray, speedometerStartArray, speedometerEndArray, distanceArray, compteurInitPlage, compteurFinPlage, pageNumber) => {
    let bodyHeaderText = ['Date', 'Trajet', 'Commentaire', 'Compteur départ', 'Compteur arriver', 'Distance']
    for(let i = 0; i < 6; i++){
        doc.lineJoin('miter')
            .rect(xEntete, yEntete, 130, 22)
            .stroke()
            .font('Helvetica-Bold')
            .text(bodyHeaderText[i], xEntete + 10, yEntete + 8);
        xEntete += 130;
    }

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

    doc.fontSize(10);
    doc
        .font('Helvetica-Bold')
        .text(pageNumber, 800, 550);
}