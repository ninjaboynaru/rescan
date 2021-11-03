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
}

module.exports = Product;
