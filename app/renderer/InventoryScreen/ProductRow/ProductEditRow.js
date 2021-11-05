import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { ProductRowItem, ProductRowBtn } from './ProductRowItem';
import Product from '../../../preload/product.js';

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

function ProductRowTextInput({ value, placeholder, onChange, error }) {
	let errorUi;

	if (error) {
		errorUi = <p className="product-row__item__input-error">{error}</p>;
	}

	return (
		<div className="product-row__item__input-container">
			<input className="product-row__item__input" type="text" value={value} placeholder={placeholder} onChange={onChange} />
			{errorUi}
		</div>
	);
}

class ProductEditRow extends React.Component {
	constructor(props) {
		super(props);

		const existingProduct = this.props.product || {};
		this.modifiedProduct = new Product(existingProduct);
		this.state = {
			name: this.modifiedProduct.name,
			noun: this.modifiedProduct.noun,
			nsn: this.modifiedProduct.nsn,
			count: this.modifiedProduct.count,

			nameError: null,
			nounError: null,
			nsnError: null
		};

		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onNSNChange = this.onNSNChange.bind(this);
		this.onCountChange = this.onCountChange.bind(this);

		this.onSaveClickInternal = this.onSaveClickInternal.bind(this);
	}

	onNameChange(event) {
		const value = event.target.value;
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

	onNounChange(event) {
		const value = event.target.value;
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

	onNSNChange(event) {
		const value = event.target.value;
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

	onCountChange(event) {
		let value = event.target.value;

		if (validIntValue(value) === false) {
			return;
		}

		if (value === '') {
			value = 0;
		}

		this.modifiedProduct.setCount(value);
		this.setState({ count: value });
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
		const { name, noun, nsn, count, nameError, nounError, nsnError } = this.state;
		const { onCancelClick } = this.props;

		return (
			<div className="product-row">
				<ProductRowItem label="Common Name"><ProductRowTextInput value={name} placeholder="name" onChange={this.onNameChange} error={nameError} /></ProductRowItem>
				<ProductRowItem label="Noun"><ProductRowTextInput value={noun} placeholder="noun" onChange={this.onNounChange} error={nounError} /></ProductRowItem>
				<ProductRowItem label="NSN"><ProductRowTextInput value={nsn} placeholder="nsn" onChange={this.onNSNChange} error={nsnError} /></ProductRowItem>
				<ProductRowItem label="Count"><ProductRowTextInput value={count} placeholder="count" onChange={this.onCountChange} /></ProductRowItem>
				<ProductRowBtn onClick={this.onSaveClickInternal}><FontAwesomeIcon icon={faSave} /></ProductRowBtn>
				<ProductRowBtn onClick={onCancelClick} outline><FontAwesomeIcon icon={faUndo} /></ProductRowBtn>
			</div>
		);
	}
}

export default ProductEditRow;
