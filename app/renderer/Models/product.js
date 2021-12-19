import shortid from 'short-uuid';
import Location from './location';

const db = window.db;
const idGenerator = shortid('0123456789');

class Product {
	constructor({ id, name, nsn, count, noun, locationID } = {}) {
		this.id = id || idGenerator.new();
		this.name = name || '';
		this.nsn = nsn || '';
		this.count = count || 0;
		this.noun = noun || '';
		this.locationID = locationID || Location.NONE_ID;
	}

	toObject() {
		return { id: this.id, name: this.name, nsn: this.nsn, count: this.count, noun: this.noun, locationID: this.locationID };
	}

	setCount(value) {
		const errorMessage = 'Unable to convert Product "count" value to number';

		if (typeof value === 'number') {
			this.count = Math.floor(value);
		}
		else if (typeof value === 'string') {
			const parsedValue = Number(value);

			if (Number.isNaN(parsedValue) === true) {
				throw new TypeError(errorMessage);
			}

			this.count = Math.floor(parsedValue);
		}
		else {
			throw new TypeError(errorMessage);
		}
	}

	save() {
		const products = db._getProducts();
		const productIndex = Product.getIndex(this.id);

		if (productIndex === -1) {
			products.push(this);
		}
		else {
			products[productIndex] = this;
		}

		return db._saveProducts(products);
	}

	static delete(productId) {
		const products = db._getProducts();
		const productIndex = Product.getIndex(productId);

		if (productIndex === -1) {
			return false;
		}

		products.splice(productIndex, 1);
		return db._saveProducts(products);
	}

	static getIndex(productID) {
		return db._getProducts().findIndex((product) => product.id === productID);
	}

	static getAll({ appendLocation } = {}) {
		return db._getProducts().map((plainProduct) => {
			const product = new Product(plainProduct);

			if (appendLocation === true) {
				product.location = Location.getName(product.locationID);

				if (!product.location) {
					product.location = 'None';
				}
			}

			return product;
		});
	}

	static someExist() {
		return db._getProducts().length >= 1;
	}

	static getByNSN(nsn) {
		const matchingProducts = [];

		db._getProducts().forEach((rawProduct) => {
			if (rawProduct.nsn === nsn) {
				matchingProducts.push(new Product(rawProduct));
			}
		});

		return matchingProducts;
	}

	static incrementByNSN(nsn) {
		const products = db._getProducts();
		const matchingProducts = [];

		products.forEach((rawProduct) => {
			if (rawProduct.nsn === nsn) {
				rawProduct.count += 1;
				matchingProducts.push(new Product(rawProduct));
			}
		});

		const success = db._saveProducts(products);

		if (success === false) {
			return false;
		}

		return matchingProducts;
	}
}

window.Product = Product;

export default Product;
