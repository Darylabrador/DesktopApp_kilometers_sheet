$(function(){
    var dropdown = document.querySelectorAll(".dropdown-btn");

    function hideAll() {
        var dropdownContainer = document.querySelectorAll(".dropdown-container");
        dropdownContainer.forEach(btn => {
            btn.style.display = "none";
        });
    }

    dropdown.forEach(btn => {
        btn.addEventListener('click', (evt) => {
            if (evt.currentTarget.nextElementSibling.style.display === "block") {
                hideAll();
                evt.currentTarget.nextElementSibling.style.display = "none";
            } else {
                hideAll();
                evt.currentTarget.nextElementSibling.style.display = "block";
            }
        })
    })
})