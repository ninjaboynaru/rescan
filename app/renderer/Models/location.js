import shortid from 'short-uuid';

const db = window.db;
const idGenerator = shortid('0123456789');

class Location {
	constructor({ name, id } = {}) {
		this.id = id || idGenerator.new();
		this.name = name || '';
	}

	save() {
		const locations = db._getLocations();
		const locationIndex = Location.getIndex(this.id);

		if (locationIndex === -1) {
			locations.push(this);
		}
		else {
			locations[locationIndex] = this;
		}

		return db._saveLocations(locations);
	}

	static delete(id) {
		const locations = db._getLocations();
		const products = db._getProducts();
		const locationIndex = Location.getIndex(id);

		if (locationIndex === -1) {
			return false;
		}

		for (const product of products) {
			if (product.locationID === id) {
				product.locationID = Location.NONE_ID;
			}
		}

		locations.splice(locationIndex, 1);
		return db._saveData(products, locations);
	}

	static getIndex(id) {
		return db._getLocations().findIndex((location) => location.id === id);
	}

	static getAll() {
		return db._getLocations().map((plainLocation) => new Location(plainLocation));
	}

	static get(id) {
		const foundLocation = db._getLocations().find((location) => location.id === id);

		if (foundLocation) {
			return new Location(foundLocation);
		}

		return null;
	}

	static getName(id) {
		const foundLocation = Location.get(id);

		if (foundLocation === null) {
			return '';
		}

		return foundLocation.name;
	}

	static getProductUsage(id) {
		return db._getProducts().filter((product) => product.locationID === id).length;
	}
}

Location.NONE_ID = -1;

export default Location;
