const shortid = require('short-uuid');

const idGenerator = shortid('0123456789');

class Product {
	constructor({ id, name, nsn, count, noun }) {
		this.id = id || idGenerator.new();
		this.name = name || '';
		this.nsn = nsn || '';
		this.count = count || 0;
		this.noun = noun || '';
	}

	toObject() {
		return { id: this.id, name: this.name, nsn: this.nsn, count: this.count, noun: this.noun };
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
}

module.exports = Product;
