import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { ProductRowItem, ProductRowBtn } from './ProductRowItem';
import Product from '../preload/product.js';

class ProductEditRow extends React.Component {
	constructor(props) {
		super(props);

		const existingProduct = this.props.product || {};
		this.modifiedProduct = new Product(existingProduct);
		this.state = { name: existingProduct.name, noun: existingProduct.noun, nsn: existingProduct.nsn, count: existingProduct.count };

		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onNsnChange = this.onNsnChange.bind(this);
		this.onCountChange = this.onCountChange.bind(this);

		this.onSaveClickInternal = this.onSaveClickInternal.bind(this);
	}

	onNameChange(event) {
		const value = event.target.value;
		this.modifiedProduct.name = value;
		this.setState({ name: value });
	}

	onNounChange(event) {
		const value = event.target.value;
		this.modifiedProduct.noun = value;
		this.setState({ noun: value });
	}

	onNsnChange(event) {
		const value = event.target.value;
		this.modifiedProduct.nsn = value;
		this.setState({ nsn: value });
	}

	onCountChange(event) {
		const value = event.target.value;
		this.modifiedProduct.count = value;
		this.setState({ count: value });
	}

	onSaveClickInternal() {
		this.props.onSaveClick(this.modifiedProduct);
	}

	render() {
		const { name, noun, nsn, count } = this.state;
		const { onCancelClick } = this.props;

		return (
			<div className="product-row">
				<ProductRowItem><input type="text" value={name} placeholder="name" onChange={this.onNameChange} /></ProductRowItem>
				<ProductRowItem><input type="text" value={noun} placeholder="noun" onChange={this.onNounChange} /></ProductRowItem>
				<ProductRowItem med><input type="text" value={nsn} placeholder="nsn" onChange={this.onNsnChange} /></ProductRowItem>
				<ProductRowItem small><input type="text" value={count} placeholder="count" onChange={this.onCountChange} /></ProductRowItem>
				<ProductRowBtn onClick={this.onSaveClickInternal}><FontAwesomeIcon icon={faSave} /></ProductRowBtn>
				<ProductRowBtn onClick={onCancelClick}><FontAwesomeIcon icon={faUndo} /></ProductRowBtn>
			</div>
		);
	}
}

export default ProductEditRow;
