const { app, BrowserWindow } = require('electron');
const electronRemote = require('@electron/remote/main');
const path = require('path');

function createWindow() {
	const extraWindowSettings = {};
	const extraWebPreferencesSettings = {};

	if (app.isPackaged === true) {
		extraWindowSettings.autoHideMenuBar = true;
		extraWindowSettings.menuBarVisible = false;
		extraWebPreferencesSettings.devTools = false;
	}

	const win = new BrowserWindow({
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, '../preload/preload.js'),
			...extraWebPreferencesSettings
		},
		...extraWindowSettings
	});

	electronRemote.initialize();
	electronRemote.enable(win.webContents);

	win.loadFile('dist/index.html');

	if (app.isPackaged === false) {
		win.webContents.openDevTools();
	}
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
	app.quit();
});
