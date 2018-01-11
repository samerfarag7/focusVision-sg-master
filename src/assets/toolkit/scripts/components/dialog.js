var $ = require('jquery');

$(document).ready(function () {
    $("#button-ModalCenterSm, #button-ModalCenterLg, #button-ModalCenterFs").click((el) => {
        var targetDialog = el.target.dataset.target;
        console.log(targetDialog);
        $(targetDialog).appendTo("body").modal('show');
    })
})

