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



exports.corpsPdf = (doc, xEntete, yEntete, sheetRow) => {
    let bodyHeaderText = ['Date', 'Trajet', 'Commentaire', 'Compteur départ', 'Compteur arriver', 'Distance']
    for(let i = 0; i < 6; i++){
        doc.lineJoin('miter')
            .rect(xEntete, yEntete, 130, 22)
            .stroke()
            .font('Helvetica-Bold')
            .text(bodyHeaderText[i], xEntete + 10, yEntete + 8);
        xEntete += 130;
    }
}