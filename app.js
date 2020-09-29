const { app, BrowserWindow } = require('electron');

const startingApp = require('./main');

/**
 * Create app window
 */
function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}


// Waiting for Electron.js to create the window
app.on('ready', function () {
    startingApp.start(function () {
        createWindow();
    });
});


// Stop all process when we leave the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


// Function using only for macOS
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});