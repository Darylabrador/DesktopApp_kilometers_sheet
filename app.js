const { app, BrowserWindow } = require('electron');
const startingApp = require('./main');

/**
 * Créer la fenetre de l'application
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

/* On attend qu'Electron.js soit prêt pour créer la fenêtre */
app.on('ready', function () {
    startingApp.start(function () {
        createWindow();
    });
});

/* Cette fonction arrête totalement l'application lorsque toutes les fenêtres sont fermées */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/* Fonction utile pour MacOS */
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});