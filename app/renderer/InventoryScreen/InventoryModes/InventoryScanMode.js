import React from 'react';
import nsnBarcodeListener from '../../nsnBarcodeListener';
import ProductRow from '../ProductRow/ProductRow';
import ProductEditRow from '../ProductRow/ProductEditRow';
import PRODUCT_MODE from './PRODUCT_MODE';

const db = window.db;

class InventoryScanMode extends React.Component {
	constructor(props) {
		super(props);

		this.state = { products: null, productMode: null, productEditId: null, productNewNSN: null };
		this.scannedNSN = null;

		this.onNSNScan = this.onNSNScan.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	componentDidMount() {
		nsnBarcodeListener.addAddListener(this.onNSNScan);
	}

	componentWillUnmount() {
		nsnBarcodeListener.removeListener(this.onNSNScan);
	}

	onNSNScan(nsn) {
		if (this.state.productMode !== null) {
			return;
		}

		const matchingProducts = db.incrementByNSN(nsn);

		if (matchingProducts === false) {
			return this.props.dbError();
		}

		if (matchingProducts.length === 0) {
			this.setState({ products: null, productMode: PRODUCT_MODE.NEW, productNewNSN: nsn });
		}
		else {
			this.setState({ products: matchingProducts });
		}

		this.scannedNSN = nsn;
	}

	saveProduct(product) {
		const { productMode, productEditId } = this.state;
		let success = false;

		if (productMode === PRODUCT_MODE.NEW) {
			success = db.createProduct(product);
		}
		else if (productMode === PRODUCT_MODE.EDIT) {
			success = db.updateProduct(productEditId, product);
		}

		if (success === false) {
			this.props.dbError();
		}
		else {
			const products = db.getProductsByNSN(this.scannedNSN);
			this.setState({ products, productMode: null, productEditId: null, productNewNSN: null });
		}
	}

	editProduct(productId) {
		this.setState({ productMode: PRODUCT_MODE.EDIT, productEditId: productId });
	}

	deleteProduct(productId) {
		const success = db.deleteProduct(productId);

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.setState({ products: db.getProductsByNSN(this.scannedNSN) });
		}
	}

	cancelEdit() {
		this.setState({ productMode: null, productEditId: null, productNewNSN: null });
	}

	buildProductRows() {
		const { products, productMode, productEditId, productNewNSN } = this.state;

		if (productMode === PRODUCT_MODE.NEW) {
			return <ProductEditRow product={{ nsn: productNewNSN, count: 1 }} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />;
		}
		if (products === null || products.length === 0) {
			return;
		}

		return products.map((product) => {
			let row;

			if (productMode === PRODUCT_MODE.EDIT && product.id === productEditId) {
				row = <ProductEditRow key={product.id} product={product} onSaveClick={this.saveProduct} onCencelClick={this.cancelEdit} />;
			}
			else {
				const onEditClick = () => this.editProduct(product.id);
				const onDeleteClick = () => this.deleteProduct(product.id);
				row = <ProductRow key={product.id} product={product} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
			}

			return row;
		});
	}

	render() {
		return (
			<>
				<div className="products-container">
					{this.buildProductRows()}
				</div>
			</>
		);
	}
}

export default InventoryScanMode;
