let btnNewRow           = document.getElementById('newRow');
let kilometerRowContent = document.getElementById('kilometerRowContent');
let infoTotalKm         = document.getElementById('totalKm');
let infoCompensation    = document.getElementById('compensation');
let rowAction           = document.getElementById('rowAction');
let btnConfirmAllRow    = document.getElementById('confirmAllRow');
let kilometersheetId    = btnNewRow.getAttribute('data-id');

let urlSelect = "/kilometersheets/reasonselect";
let urlAddRow = "/kilometersheets/addrows";
let req = new XMLHttpRequest();
let method, data;

/**
 * Update total km info
 */
const updateTotalKm = () => {
    let resultDisplay  = 0;
    let allDistance = document.querySelectorAll('.displayDistance');
    allDistance.forEach(distanceInfo => {
        resultDisplay += +distanceInfo.value;
    });
    infoTotalKm.value = resultDisplay;

    // All scale case
    let case1 = document.getElementById('case1').value;
    let case2 = document.getElementById('case2').value;
    let case3 = document.getElementById('case3').value;
    
    if (resultDisplay <= 5000){
        infoCompensation.value = Math.round( +case1 * resultDisplay );
    } else if (resultDisplay > 5000 && resultDisplay <= 20000 ) {
        let [number1, number2] = case2.split('+');
        infoCompensation.value = Math.round(+number1 * resultDisplay) + +number2;
    } else {
        infoCompensation.value = Math.round(+case3 * resultDisplay);
    }
}


/**
 * 
 * @param {number} speedometerStart 
 * @param {number} speedometerEnd 
 */
const calculDistanceOnRow = (speedometerStart, speedometerEnd, displayDistance) => {
    
    for (let i = 0; i < speedometerStart.length; i++) {
        speedometerStart[i].addEventListener('keyup', evt => {
            let valueStart = +evt.currentTarget.value;
            let valueEnd = +speedometerEnd[i].value;

            if (valueStart == 0) {
                infoTotalKm.value      = 0;
                infoCompensation.value = 0;
            }

            if(valueStart > valueEnd){
                displayDistance[i].value = 0;
            }else{
                displayDistance[i].value = valueEnd - valueStart;
                updateTotalKm();
            }
        });

        speedometerStart[i].addEventListener('change', evt => {
            let valueStart = +evt.currentTarget.value;
            let valueEnd = +speedometerEnd[i].value;

            if (valueStart == 0) {
                infoTotalKm.value      = 0;
                infoCompensation.value = 0;
            }

            if(valueStart > valueEnd){
                displayDistance[i].value = 0;
            }else{
                displayDistance[i].value = valueEnd - valueStart;
                updateTotalKm();
            }
            
        });

        speedometerEnd[i].addEventListener('keyup', evt => {
            let valueStart = +speedometerStart[i].value;
            let valueEnd = +evt.currentTarget.value;

            if (valueEnd == 0){
                infoTotalKm.value      = 0;
                infoCompensation.value = 0;
            }

            if(valueStart > valueEnd){
                displayDistance[i].value = 0;
            }else{
                displayDistance[i].value = valueEnd - valueStart;
                updateTotalKm();
            }
        });

        speedometerEnd[i].addEventListener('change', evt => {
            let valueStart = +speedometerStart[i].value;
            let valueEnd = +evt.currentTarget.value;

            if (valueEnd == 0) {
                infoTotalKm.value      = 0;
                infoCompensation.value = 0;
            }

            if(valueStart > valueEnd){
                displayDistance[i].value = 0;
            }else{
                displayDistance[i].value = valueEnd - valueStart;
                updateTotalKm();
            }
        });
    }
}

btnNewRow.addEventListener('click', evt => {
    let infoClass = rowAction.classList.contains('d-none');
    if(infoClass) {
        rowAction.classList.remove('d-none');
    }

    btnConfirmAllRow.removeAttribute('disabled');

    // create the row 
    let newRowInput = document.createElement('tr');
    newRowInput.classList.add('kilometersheetrows');
    
    // set the current date
    let today = new Date().toISOString().substr(0, 10);

    newRowInput.innerHTML = `
        <td> 
            <input type="date" value="${today}" class="form-control dateRow">
        </td>

        <td> 
            <input type="text" class="form-control travelRow">
        </td>

        <td class="selectField"> </td>

        <td> 
            <input type="number" step="0.01" min="0" placeholder="0" class="form-control speedometerStart">
        </td>
  
        <td> 
            <input type="number" step="0.01" min="0" placeholder="0" class="form-control speedometerEnd">
        </td>

        <td> 
            <input disabled type="number" step="0.01" min="0" placeholder="0" class="form-control displayDistance">
        </td>

        <td class="d-flex justify-content-center align-items-center"> 
            <button type="button" class="btn btnExport btnDeleteRow bg-transparent border-0 mx-0 px-0">
                <span class="iconify iconify__red mx-1" data-inline="false" data-icon="bpmn:end-event-cancel" style="font-size: 16px !important"></span>
            </button>
        </td>
    `;

    kilometerRowContent.appendChild(newRowInput);


    // select info about movereason
    let selectInfo = document.querySelectorAll('.selectField');

    method = "GET";
    req.open(method, urlSelect);
    req.responseType = "json";
    req.send();

    req.onload = () => {
        if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            let reponse = req.response;
            let selectReason = document.createElement('select');
            selectReason.classList.add('form-control', 'reasonRow');

            for (let i = 0; i < reponse.selectField.length; i++){
                let optionsSelect = document.createElement('option');
                optionsSelect.value       = reponse.selectField[i].id;
                optionsSelect.textContent = reponse.selectField[i].label;
                selectReason.appendChild(optionsSelect);
            } 

            for (let j = 0; j < selectInfo.length; j++){
                selectInfo[j].appendChild(selectReason);
            }
        }
    }

    let speedometerStart  = document.querySelectorAll('.speedometerStart');
    let speedometerEnd    = document.querySelectorAll('.speedometerEnd');
    let displayDistance   = document.querySelectorAll('.displayDistance');

    calculDistanceOnRow(speedometerStart, speedometerEnd, displayDistance);

    let btnDeleteRow = document.querySelectorAll('.btnDeleteRow');
    for (let k = 0; k < btnDeleteRow.length; k++) {
        

        btnDeleteRow[k].addEventListener('click', evt => {
            btnDeleteRow[k].parentElement.parentElement.remove();

            let btnDeleteRowLength = document.querySelectorAll('.btnDeleteRow').length;
            
            if (btnDeleteRowLength == 0) {
                btnConfirmAllRow.setAttribute('disabled', "");
            }

            let speedometerStart = document.querySelectorAll('.speedometerStart');
            let speedometerEnd   = document.querySelectorAll('.speedometerEnd');
            let displayDistance  = document.querySelectorAll('.displayDistance');
            calculDistanceOnRow(speedometerStart, speedometerEnd, displayDistance);
        });
    }
    
});

// Confirm end edit before sending data
btnConfirmAllRow.addEventListener('click', evt => {
    bootbox.confirm({
        centerVertical: true,
        message: "Avez-vous terminer ?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Non'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Oui'
            }
        },
        callback: function (result) { 

            if(result) {
                let isComplete = true;
                let dateRowInfo           = document.querySelectorAll('.dateRow');
                let travelRowInfo         = document.querySelectorAll('.travelRow');
                let reasonRowInfo         = document.querySelectorAll('.reasonRow');
                let speedometerStartInfo  = document.querySelectorAll('.speedometerStart');
                let speedometerEndInfo    = document.querySelectorAll('.speedometerEnd');
                let displayDistanceInfo   = document.querySelectorAll('.displayDistance');
                let infoTotalKmInfo       = document.getElementById('totalKm').value;
                let infoCompensationInfo  = document.getElementById('compensation').value;

                let dateRowArray            = [];
                let travelRowArray          = [];
                let reasonRowArray          = [];
                let speedometerStartArray   = [];
                let speedometerEndArray     = [];
                let distanceArray           = [];

                for (let i = 0; i < dateRowInfo.length; i++){
                    if (dateRowInfo[i].value != "" && travelRowInfo[i].value != "" && reasonRowInfo[i].value != "" && speedometerStartInfo[i].value != "" && speedometerEndInfo[i].value != "" && displayDistanceInfo[i].value != "") {
                        dateRowArray.push(dateRowInfo[i].value);
                        travelRowArray.push(travelRowInfo[i].value);
                        reasonRowArray.push(reasonRowInfo[i].value);
                        speedometerStartArray.push(speedometerStartInfo[i].value);
                        speedometerEndArray.push(speedometerEndInfo[i].value);
                        distanceArray.push(displayDistanceInfo[i].value);
                    } else {
                        bootbox.alert({
                            centerVertical: true,
                            message: "Une ligne est incomplète !"
                        });
                        isComplete = false;
                    }
                }

                if(isComplete){
                    method = "POST";
                    
                    data = {
                        kilometersheetId, infoTotalKmInfo, infoCompensationInfo,
                        dateRowArray, travelRowArray, reasonRowArray, speedometerStartArray, speedometerEndArray, distanceArray
                    }

                    req.open(method, urlAddRow);
                    req.responseType = "json";
                    req.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
                    req.send(JSON.stringify(data));

                    req.onload = () => {
                        if(req.readyState === XMLHttpRequest.DONE) {
                            if(req.status === 200) {
                                let reponse = req.response;
                                if(reponse.success){
                                    location.reload();
                                    localStorage.setItem('isSuccess', reponse.message);
                                } else {
                                    bootbox.alert({
                                        centerVertical: true,
                                        message: reponse.message
                                    });
                                }
                            }
                        } else {
                            bootbox.alert({
                                centerVertical: true,
                                message: "Une erreur est survenue"
                            });
                        }
                    }
                }
            }
        }
    })
});

if(localStorage.getItem('isSuccess')){
    bootbox.alert({
        centerVertical: true,
        message: localStorage.getItem('isSuccess'),
        callback: function() {
            localStorage.clear();
        }
    });
}