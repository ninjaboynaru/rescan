import React from 'react';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import Product from '../../all/product';
import { buildLocationListOptions } from './util';
import { DataRow, DataItem, DataRowTextInput, DataRowSearchList, DataRowButton } from '../DataList';

const FIELD_ERROR_TEXT = 'Invalid Input';
const MAX_TEXT_FIELD_LENGTH = 42;
const MAX_COUNT = 1000000;

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
		const locationOptions = buildLocationListOptions(false, true);
		const defaultLocationValue = locationOptions.find((locationOption) => locationOption.value === locationID);

		return (
			<DataRow>
				<DataItem label="Common Name" error={nameError}><DataRowTextInput value={name} placeholder="name" onChange={this.onNameChange} /></DataItem>
				<DataItem label="Noun" error={nounError}><DataRowTextInput value={noun} placeholder="noun" onChange={this.onNounChange} /></DataItem>
				<DataItem label="NSN" error={nsnError}><DataRowTextInput value={nsn} placeholder="nsn" onChange={this.onNSNChange} /></DataItem>
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
