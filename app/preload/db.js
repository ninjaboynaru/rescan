const fs = require('fs');
const Product = require('../all/product.js');

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

		if (Array.isArray(parsedDB.locations) === false) {
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
		return save(filePath, { name: invName, products: [], locations: [] });
	};

	this.getDBName = function getDBName() {
		return activeDB.obj.name;
	};

	this.getAllProducts = function getAllProducts() {
		return activeDB.obj.products.map((plainProduct) => new Product(plainProduct));
	};

	this.hasProducts = function dbHasProducts() {
		return activeDB.obj.products.length >= 1;
	};

	this.getProductsByNSN = function getProductsByNSN(nsn) {
		const matchingProducts = [];

		activeDB.obj.products.forEach((rawProduct) => {
			if (rawProduct.nsn === nsn) {
				matchingProducts.push(new Product(rawProduct));
			}
		});

		return matchingProducts;
	};

	this.incrementByNSN = function incrementByNSN(nsn) {
		const matchingProducts = [];

		activeDB.obj.products.forEach((rawProduct) => {
			if (rawProduct.nsn === nsn) {
				rawProduct.count += 1;
				matchingProducts.push(new Product(rawProduct));
			}
		});

		const success = save();

		if (success === false) {
			return false;
		}

		return matchingProducts;
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
	};

	this.updateProduct = function updateProduct(productId, newProduct) {
		const productIndex = getProductIndex(productId);

		if (productIndex === -1) {
			return false;
		}

		activeDB.obj.products[productIndex] = newProduct;

		return save();
	};

	this.createProduct = function createProduct(newProduct) {
		activeDB.obj.products.push(newProduct);

		return save();
	};

	this.getLocations = function getLocations() {
		return activeDB.obj.locations.map((location) => ({ ...location }));
	};

	this.getLocation = function getLocation(locationID) {
		const foundLocation = activeDB.obj.locations.find((location) => location.id === locationID);

		if (foundLocation) {
			return { ...foundLocation };
		}

		return null;
	};

	this.getLocationName = function getLocationName(locationID) {
		const location = this.getLocation(locationID);

		if (location === null) {
			return '';
		}

		return location.name;
	}.bind(this);
}();

module.exports = db;
