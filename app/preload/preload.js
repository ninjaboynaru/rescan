const { contextBridge } = require('electron');
const db = require('./db.js');
const dbDialog = require('./dbDialog.js');

contextBridge.exposeInMainWorld('dbDialog', dbDialog);
contextBridge.exposeInMainWorld('db', db);
