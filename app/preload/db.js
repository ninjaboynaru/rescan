const fs = require('fs');
const Product = require('./product.js');

const db = new function() {
	const activeDB = {
		obj: null,
		filePath: null
	};

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

		if (Array.isArray(parsedDB.products) === false) {
			return false;
		}

		return parsedDB;
	}

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
		const dbObj = { name: invName, products: [] };

		const fileContents = JSON.stringify(dbObj);

		try {
			fs.writeFileSync(filePath, fileContents);
		}
		catch {
			return false;
		}

		return true;
	};

	this.getDBName = function getDBName() {
		return activeDB.obj.name;
	};

	this.getAllProducts = function getAllProducts() {
		return activeDB.obj.products.map((rawProduct) => new Product(rawProduct));
	};
}();

module.exports = db;
