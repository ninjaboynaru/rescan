import React from 'react';
import Fuse from 'fuse.js';
import Button from '../../Button';
import Product from '../../../preload/product';
import ProductRow from '../ProductRow/ProductRow';
import ProductEditRow from '../ProductRow/ProductEditRow';
import TextInput from '../../TextInput';
import PRODUCT_MODE from './PRODUCT_MODE';

const db = window.db;

class InventoryManualMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: null, displayProducts: null, searchText: '', productMode: null, productEditId: null };

		this.newProduct = this.newProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	componentDidMount() {
		this.loadProducts();
	}

	onSearchChange(event) {
		const value = event.target.value;
		this.setState({ searchText: value });
		this.updateDisplayProducts(value);
	}

	updateDisplayProducts(searchTerm) {
		if (searchTerm.trim().length === 0) {
			this.setState((prevState) => ({ displayProducts: prevState.products }));
		}
		else {
			const searchKeys = ['name', 'noun', 'nsn'];
			const fuse = new Fuse(this.state.products, { keys: searchKeys });
			const searchResults = fuse.search(searchTerm).map((result) => new Product(result.item));
			this.setState({ displayProducts: searchResults });
		}
	}

	loadProducts() {
		const products = db.getAllProducts();
		this.setState({ products }, () => {
			this.updateDisplayProducts(this.state.searchText);
		});
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
		const { displayProducts, productMode, productEditId } = this.state;

		if (displayProducts === null) {
			return;
		}

		const rows = displayProducts.map((product) => {
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
					<TextInput value={this.state.searchText} onChange={this.onSearchChange} placeholder="Search Products" />
					{this.buildProductRows()}
				</div>
			</>
		);
	}
}

export default InventoryManualMode;
