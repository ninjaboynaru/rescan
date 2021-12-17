const fs = require('fs');

const db = new function() {
	const activeDB = {
		obj: null,
		filePath: null
	};

	function validateData(dataArray) {
		return Array.isArray(dataArray);
	}

	function validateDBContents(stringContents) {
		let parsedDB;

		try {
			parsedDB = JSON.parse(stringContents);
		}
		catch {
			return false;
		}

		if (typeof parsedDB.name !== 'string') {
			return false;
		}

		if (validateData(parsedDB.products) === false) {
			return false;
		}

		if (validateData(parsedDB.locations) === false) {
			return false;
		}

		return parsedDB;
	}

	/**
	 * Returns false if the save operation failed, otherwise, returns true
	 * @param {string} filePath
	 * @param {object} dbObj
	 * @returns success
	 */
	function save(filePath, dbObj) {
		let useFilePath = filePath;
		let useDbObj = dbObj;

		if (!filePath) {
			useFilePath = activeDB.filePath;
		}
		if (!dbObj) {
			useDbObj = activeDB.obj;
		}

		const fileContents = JSON.stringify(useDbObj);

		try {
			fs.writeFileSync(useFilePath, fileContents);
		}
		catch {
			return false;
		}

		return true;
	}

	this._saveData = function saveData(products, locations) {
		if (!validateData(products) || !validateData(locations)) {
			return false;
		}

		activeDB.obj.products = products;
		activeDB.obj.locations = locations;

		return save();
	};

	this._saveProducts = function saveProducts(products) {
		if (validateData(products) === false) {
			return false;
		}

		activeDB.obj.products = products;
		return save();
	};

	this._saveLocations = function saveLocations(locations) {
		if (validateData(locations) === false) {
			return false;
		}

		activeDB.obj.locations = locations;
		return save();
	};

	this.open = function open(filePath) {
		let fileContents;

		try {
			fileContents = fs.readFileSync(filePath);
		}
		catch {
			return false;
		}

		const dbObj = validateDBContents(fileContents);

		if (dbObj === false) {
			return false;
		}

		activeDB.obj = dbObj;
		activeDB.filePath = filePath;

		return true;
	};

	this.create = function create(filePath, invName) {
		return save(filePath, { name: invName, products: [], locations: [] });
	};

	this.getDBName = function getDBName() {
		return activeDB.obj.name;
	};

	this._getProducts = function _getProducts() {
		return activeDB.obj.products;
	};

	this._getLocations = function _getLocations() {
		return activeDB.obj.locations;
	};
}();

module.exports = db;
