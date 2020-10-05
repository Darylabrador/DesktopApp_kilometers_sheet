let btnNewRow           = document.getElementById('newRow');
let kilometerRowContent = document.getElementById('kilometerRowContent');
let infoTotalKm         = document.getElementById('totalKm');
let infoCompensation    = document.getElementById('compensation');
let rowAction           = document.getElementById('rowAction');
let kilometersheetId    = btnNewRow.getAttribute('data-id');

let urlSelect = "/kilometersheets/reasonselect";
let req = new XMLHttpRequest();
let method, data;

/**
 * 
 * @param {number} speedometerStart 
 * @param {number} speedometerEnd 
 */
const calculDistanceOnRow = (speedometerStart, speedometerEnd, displayDistance) => {
    let resultDisplay = 0;
    for (let i = 0; i < speedometerStart.length; i++) {
        speedometerStart[i].addEventListener('keyup', evt => {
            displayDistance[i].value = +speedometerEnd[i].value - +evt.currentTarget.value;
        });

        speedometerStart[i].addEventListener('change', evt => {
            displayDistance[i].value = +speedometerEnd[i].value - +evt.currentTarget.value;
        });

        speedometerEnd[i].addEventListener('keyup', evt => {
            displayDistance[i].value = +evt.currentTarget.value - +speedometerStart[i].value;
        });

        speedometerEnd[i].addEventListener('change', evt => {
            displayDistance[i].value = +evt.currentTarget.value - +speedometerStart[i].value;
        });
    }
}

btnNewRow.addEventListener('click', evt => {
    let infoClass = rowAction.classList.contains('d-none');
    if(infoClass) {
        rowAction.classList.remove('d-none');
    }

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
            <input type="text" class="form-control driveRow">
        </td>

        <td class="selectField"> </td>

        <td> 
            <input type="number" step="0.001" min="0" value="0" class="form-control speedometerStart">
        </td>
  
        <td> 
            <input type="number" step="0.001" min="0" value="0" class="form-control speedometerEnd">
        </td>

        <td> 
            <input disabled type="number" step="0.001" min="0" value="0" class="form-control displayDistance">
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


    let dateRow           = document.querySelectorAll('.dateRow');
    let driveRow          = document.querySelectorAll('.driveRow');
    let reasonRow         = document.querySelectorAll('.reasonRow');
    let speedometerStart  = document.querySelectorAll('.speedometerStart');
    let speedometerEnd    = document.querySelectorAll('.speedometerEnd');
    let displayDistance   = document.querySelectorAll('.displayDistance');

    calculDistanceOnRow(speedometerStart, speedometerEnd, displayDistance);

    let btnDeleteRow = document.querySelectorAll('.btnDeleteRow');
    for (let k = 0; k < btnDeleteRow.length; k++) {
        btnDeleteRow[k].addEventListener('click', evt => {
            btnDeleteRow[k].parentElement.parentElement.remove();
            let speedometerStart = document.querySelectorAll('.speedometerStart');
            let speedometerEnd   = document.querySelectorAll('.speedometerEnd');
            let displayDistance  = document.querySelectorAll('.displayDistance');
            calculDistanceOnRow(speedometerStart, speedometerEnd, displayDistance);
        });
    }
});