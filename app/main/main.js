const { app, BrowserWindow } = require('electron');
const electronRemote = require('@electron/remote/main');
const path = require('path');

function createWindow() {
	const win = new BrowserWindow({
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, '../preload/preload.js')
		}
	});

	electronRemote.initialize();
	electronRemote.enable(win.webContents);

	// win.removeMenu();
	win.loadFile('dist/index.html');
	win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit);
