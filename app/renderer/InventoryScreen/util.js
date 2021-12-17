import { Location } from '../Models';

const LOCATION_NONE_OPTION = { value: Location.NONE_ID, label: 'None' };
const LOCATION_ALL_OPTION = { value: -2, label: 'All' };

function buildLocationListOptions(includeAllOption, includeNoneOption) {
	const options = Location.getAll().map((location) => ({
		value: location.id,
		label: location.name
	}));

	if (includeNoneOption === true) {
		options.unshift(LOCATION_NONE_OPTION);
	}

	if (includeAllOption === true) {
		options.unshift(LOCATION_ALL_OPTION);
	}

	return options;
}

export { buildLocationListOptions, LOCATION_ALL_OPTION, LOCATION_NONE_OPTION };
