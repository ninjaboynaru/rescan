const getVersion = require('@electron/remote').app.getVersion;

function getAppVersion() {
	return getVersion();
}

module.exports = getAppVersion;
