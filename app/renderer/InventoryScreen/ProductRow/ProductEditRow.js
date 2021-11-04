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

	if (value.trim().length === 0) {
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
		this.onNsnChange = this.onNsnChange.bind(this);
		this.onCountChange = this.onCountChange.bind(this);

		this.onSaveClickInternal = this.onSaveClickInternal.bind(this);
	}

	onNameChange(event) {
		const value = event.target.value;
		let nameError = null;

		if (validTextValue(value) === false) {
			nameError = FIELD_ERROR_TEXT;
		}

		this.modifiedProduct.name = value;
		this.setState({ name: value, nameError });
	}

	onNounChange(event) {
		const value = event.target.value;
		let nounError = null;

		if (validTextValue(value) === false) {
			nounError = FIELD_ERROR_TEXT;
		}

		this.modifiedProduct.noun = value;
		this.setState({ noun: value, nounError });
	}

	onNsnChange(event) {
		const value = event.target.value;
		let nsnError = null;

		if (validTextValue(value) === false) {
			nsnError = FIELD_ERROR_TEXT;
		}

		this.modifiedProduct.nsn = value;
		this.setState({ nsn: value, nsnError });
	}

	onCountChange(event) {
		const value = event.target.value;

		if (validIntValue(value) === false) {
			return;
		}

		this.modifiedProduct.setCount(value);
		this.setState({ count: value });
	}

	onSaveClickInternal() {
		const { nameError, nounError, nsnError } = this.state;

		if (nameError || nounError || nsnError) {
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
				<ProductRowItem label="NSN"><ProductRowTextInput value={nsn} placeholder="nsn" onChange={this.onNsnChange} error={nsnError} /></ProductRowItem>
				<ProductRowItem label="Count"><ProductRowTextInput value={count} placeholder="count" onChange={this.onCountChange} /></ProductRowItem>
				<ProductRowBtn onClick={this.onSaveClickInternal}><FontAwesomeIcon icon={faSave} /></ProductRowBtn>
				<ProductRowBtn onClick={onCancelClick} outline><FontAwesomeIcon icon={faUndo} /></ProductRowBtn>
			</div>
		);
	}
}

export default ProductEditRow;
