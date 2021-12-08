const shortid = require('short-uuid');

const idGenerator = shortid('0123456789');

function Location({ name, id }) {
	this.id = id || idGenerator.new();
	this.name = name || '';
}

module.exports = Location;
