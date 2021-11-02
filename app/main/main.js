const { app, BrowserWindow } = require('electron');
const electronRemote = require('@electron/remote/main');
const path = require('path');

function createWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, '../preload/preload.js')
		}
	});

	electronRemote.initialize();
	electronRemote.enable(win.webContents);

	win.loadFile('dist/index.html');
	win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit);
