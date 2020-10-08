const { remote } = require('electron');

/**
 * Actions on the app window's
 */
$(function(){
    var actualWin = remote.getCurrentWindow();

    $('#minimize').on('click', function () {
        actualWin.minimize();
    });

    $('#maximize').on('click', function () {
        if (!actualWin.isMaximized()) {
            return actualWin.maximize();
        }
        actualWin.unmaximize();
    });

    $('#close').on('click', function () {
        actualWin.close();
    });
});
