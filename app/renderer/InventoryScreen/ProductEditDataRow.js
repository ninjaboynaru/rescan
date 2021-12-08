import React from 'react';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import Product from '../../all/product';
import { DataRow, DataItem, DataRowTextInput, DataRowSearchList, DataRowButton } from '../DataList';

const db = window.db;

const FIELD_ERROR_TEXT = 'Invalid Input';
const MAX_TEXT_FIELD_LENGTH = 42;
const MAX_COUNT = 1000000;
const LOCATION_NONE_OPTION = { value: -1, label: 'None' };

function validTextValue(value) {
	if (typeof value !== 'string') {
		return false;
	}

	if (value.trim().length === 0) {
		return false;
	}

	if (value.length > MAX_TEXT_FIELD_LENGTH) {
		return false;
	}

	return true;
}

function validIntValue(value) {
	if (typeof value !== 'string') {
		return false;
	}

	const parsedNumber = Number(value);

	if (Number.isNaN(parsedNumber) === true) {
		return false;
	}

	if (Number.isInteger(parsedNumber) === false) {
		return false;
	}

	if (parsedNumber > MAX_COUNT || parsedNumber < MAX_COUNT * -1) {
		return false;
	}

	if (value.includes('.' || value.includes('e') || value.includes('-'))) {
		return false;
	}

	return true;
}

function validNSN(value) {
	const regex = new RegExp('^([a-z0-9]){13}$', 'i');
	return regex.test(value);
}

function getLocationOptions() {
	const locationOptions = db.getLocations().map((location) => ({ value: location.id, label: location.name }));
	locationOptions.unshift(LOCATION_NONE_OPTION);

	return locationOptions;
}

class ProductEditRow extends React.Component {
	constructor(props) {
		super(props);

		this.modifiedProduct = new Product(this.props.product);
		this.state = {
			name: this.modifiedProduct.name,
			noun: this.modifiedProduct.noun,
			nsn: this.modifiedProduct.nsn,
			count: this.modifiedProduct.count,
			locationID: this.modifiedProduct.locationID,

			nameError: null,
			nounError: null,
			nsnError: null
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onNSNChange = this.onNSNChange.bind(this);
		this.onCountChange = this.onCountChange.bind(this);
		this.onLocationChange = this.onLocationChange.bind(this);

		this.onSaveClickInternal = this.onSaveClickInternal.bind(this);
	}

	onNameChange(value) {
		this.setState({ name: value });

		if (this.state.nameError) {
			let nameError = null;
			if (validTextValue(value) === false) {
				nameError = FIELD_ERROR_TEXT;
			}

			this.setState({ nameError });
		}

		this.modifiedProduct.name = value;
	}

	onNounChange(value) {
		this.setState({ noun: value });

		if (this.state.nounError) {
			let nounError = null;
			if (validTextValue(value) === false) {
				nounError = FIELD_ERROR_TEXT;
			}

			this.setState({ nounError });
		}

		this.modifiedProduct.noun = value;
	}

	onNSNChange(value) {
		this.setState({ nsn: value });

		if (this.state.nsnError) {
			let nsnError = null;
			if (validTextValue(value) === false || validNSN(value) === false) {
				nsnError = FIELD_ERROR_TEXT;
			}

			this.setState({ nsnError });
		}

		this.modifiedProduct.nsn = value;
	}

	onCountChange(value) {
		if (validIntValue(value) === false) {
			return;
		}

		if (value === '') {
			value = 0;
		}

		this.modifiedProduct.setCount(value);
		this.setState({ count: value });
	}

	onLocationChange(locationOption) {
		this.setState({ locationID: locationOption.value });
		this.modifiedProduct.locationID = locationOption.value;
	}

	onSaveClickInternal() {
		const { name, noun, nsn } = this.state;
		let { nameError, nounError, nsnError } = this.state;

		if (validTextValue(name) === false) {
			nameError = FIELD_ERROR_TEXT;
		}
		if (validTextValue(noun) === false) {
			nounError = FIELD_ERROR_TEXT;
		}
		if (validTextValue(nsn) === false || validNSN(nsn) === false) {
			nsnError = FIELD_ERROR_TEXT;
		}

		if (nameError || nounError || nsnError) {
			this.setState({ nameError, nounError, nsnError });
			return;
		}

		this.props.onSaveClick(this.modifiedProduct);
	}

	render() {
		const { name, noun, nsn, count, locationID, nameError, nounError, nsnError } = this.state;
		const { onCancelClick } = this.props;
		const locationOptions = getLocationOptions();
		const defaultLocationValue = locationOptions.find((locationOption) => locationOption.value === locationID);

		return (
			<DataRow>
				<DataItem label="Common Name"><DataRowTextInput value={name} placeholder="name" onChange={this.onNameChange} error={nameError} /></DataItem>
				<DataItem label="Noun"><DataRowTextInput value={noun} placeholder="noun" onChange={this.onNounChange} error={nounError} /></DataItem>
				<DataItem label="NSN"><DataRowTextInput value={nsn} placeholder="nsn" onChange={this.onNSNChange} error={nsnError} /></DataItem>
				<DataItem label="Count"><DataRowTextInput value={count} placeholder="count" onChange={this.onCountChange} /></DataItem>
				<DataItem label="Location">
					<DataRowSearchList defaultValue={defaultLocationValue} options={locationOptions} onChange={this.onLocationChange} />
				</DataItem>
				<DataRowButton onClick={this.onSaveClickInternal} icon={faSave} />
				<DataRowButton onClick={onCancelClick} outline icon={faUndo} />
			</DataRow>
		);
	}
}

export default ProductEditRow;
