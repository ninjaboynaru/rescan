const { contextBridge } = require('electron');
const db = require('./db.js');
const dbDialog = require('./dbDialog.js');
const csvSaver = require('./csvSaver.js');
const getFLISProduct = require('./getFLISProduct');
const getAppVersion = require('./getAppVersion');

contextBridge.exposeInMainWorld('dbDialog', dbDialog);
contextBridge.exposeInMainWorld('db', db);
contextBridge.exposeInMainWorld('csvSaver', csvSaver);
contextBridge.exposeInMainWorld('getFLISProduct', getFLISProduct);
contextBridge.exposeInMainWorld('getAppVersion', getAppVersion);
