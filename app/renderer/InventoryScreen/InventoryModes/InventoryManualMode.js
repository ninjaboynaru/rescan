import React from 'react';
import Button from '../../Button';
import ProductRow from '../ProductRow/ProductRow';
import ProductEditRow from '../ProductRow/ProductEditRow';
import PRODUCT_MODE from './productMode';

const db = window.db;

class InventoryManualMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: null, productMode: null, productEditId: null };

		this.newProduct = this.newProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts() {
		this.setState({ products: db.getAllProducts() });
	}

	newProduct() {
		this.setState({ productMode: PRODUCT_MODE.NEW, productEditId: null });
	}

	editProduct(productId) {
		this.setState({ productMode: PRODUCT_MODE.EDIT, productEditId: productId });
	}

	cancelEdit() {
		this.setState({ productMode: null, productEditId: null });
	}

	deleteProduct(productId) {
		const success = db.deleteProduct(productId);

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.loadProducts();
		}
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
			this.setState({ productMode: null, productEditId: null });
			this.loadProducts();
		}
	}

	buildProductRows() {
		const { products, productMode, productEditId } = this.state;
		if (products === null) {
			return;
		}

		const rows = products.map((product) => {
			let row;

			if (productMode === PRODUCT_MODE.EDIT && productEditId === product.id) {
				row = <ProductEditRow key={product.id} product={product} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />;
			}
			else {
				const onEditClick = () => this.editProduct(product.id);
				const onDeleteClick = () => this.deleteProduct(product.id);
				row = <ProductRow key={product.id} product={product} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
			}

			return row;
		});

		if (productMode === PRODUCT_MODE.NEW) {
			rows.unshift(<ProductEditRow key="NEW" product={{ count: 1 }} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />);
		}

		return rows;
	}

	render() {
		return (
			<>
				<Button onClick={this.newProduct}>New Product</Button>
				<div className="products-container">
					{this.buildProductRows()}
				</div>
			</>
		);
	}
}

export default InventoryManualMode;
