const shortid = require('short-uuid');

const idGenerator = shortid('0123456789');

class Product {
	constructor({ id, name, nsn, count, noun }) {
		this.id = id || idGenerator.new();
		this.name = name;
		this.nsn = nsn;
		this.count = count;
		this.noun = noun;
	}
}

module.exports = Product;
