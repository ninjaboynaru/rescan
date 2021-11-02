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
		return save(filePath, { name: invName, products: [] });
	};

	this.getDBName = function getDBName() {
		return activeDB.obj.name;
	};

	this.getAllProducts = function getAllProducts() {
		return activeDB.obj.products.map((rawProduct) => new Product(rawProduct));
	};

	function getProductIndex(productId) {
		return activeDB.obj.products.findIndex((product) => product.id === productId);
	}

	this.deleteProduct = function deleteProduct(productId) {
		const productIndex = getProductIndex(productId);

		if (productIndex === -1) {
			return false;
		}

		activeDB.obj.products.splice(productIndex, 1);
		return save();
	}

	this.updateProduct = function updateProduct(productId, newProduct) {
		const productIndex = getProductIndex(productId);

		if (productIndex === -1) {
			return false;
		}

		activeDB.obj.products[productIndex] = newProduct;

		return save();
	}
}();

module.exports = db;
