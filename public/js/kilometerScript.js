let btnNewRow           = document.getElementById('newRow');
let kilometerRowContent = document.getElementById('kilometerRowContent');
let infoTotalKm         = document.getElementById('totalKm');
let infoCompensation    = document.getElementById('compensation');
let rowAction           = document.getElementById('rowAction');
let kilometersheetId    = btnNewRow.getAttribute('data-id');

let urlSelect = "/kilometersheets/reasonselect";
let req = new XMLHttpRequest();
let method, data;

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
            <input type="date" value="${today}" class="form-control">
        </td>

        <td> 
            <input type="text" class="form-control">
        </td>

        <td id="selectField"> </td>

        <td> 
            <input type="number" step="1" min="0" class="form-control">
        </td>
  
        <td> 
            <input type="number" step="1" min="0" class="form-control">
        </td>

        <td> 
            <input type="number" step="1" min="0" class="form-control">
        </td>

        <td class="d-flex justify-content-center align-items-center"> 
            <button type="button" class="btn btnExport bg-transparent border-0 mx-0 px-0">
                <span class="iconify iconify__red mx-1" data-inline="false" data-icon="bpmn:end-event-cancel" style="font-size: 16px !important"></span>
            </button>
        </td>
    `;

    kilometerRowContent.appendChild(newRowInput);


    // select info about movereason
    let selectInfo = document.getElementById('selectField');

    method = "GET";
    req.open(method, urlSelect);
    req.responseType = "json";
    req.send();

    req.onload = () => {
        if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            let reponse = req.response;
            let selectReason = document.createElement('select');
            selectReason.classList.add('form-control');

            for (let i = 0; i < reponse.selectField.length; i++){
                let optionsSelect = document.createElement('option');
                optionsSelect.value       = reponse.selectField[i].id;
                optionsSelect.textContent = reponse.selectField[i].label;
                selectReason.appendChild(optionsSelect);
            } 
            selectInfo.appendChild(selectReason);
        }
    }
});