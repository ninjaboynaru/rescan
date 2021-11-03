const { contextBridge } = require('electron');
const db = require('./db.js');
const dbDialog = require('./dbDialog.js');
const csvSaver = require('./csvSaver.js');

contextBridge.exposeInMainWorld('dbDialog', dbDialog);
contextBridge.exposeInMainWorld('db', db);
contextBridge.exposeInMainWorld('csvSaver', csvSaver);
