import React from 'react';
import Fuse from 'fuse.js';
import Product from '../../all/product';
import Button from '../Button';
import { DataListContainer, DataListButtonHeader } from '../DataList';
import ProductDataRow from './ProductDataRow';
import ProductEditDataRow from './ProductEditDataRow';
import EDIT_MODE from '../EDIT_MODE';

const db = window.db;
const csvSaver = window.csvSaver;

class InventoryManualMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: null, displayProducts: null, searchText: '', editMode: null, productEditId: null };

		this.createProduct = this.createProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.saveCSV = this.saveCSV.bind(this);
	}

	componentDidMount() {
		this.loadProducts();
	}

	onSearchChange(searchText) {
		this.setState({ searchText });
		this.updateDisplayProducts(searchText);
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

	createProduct() {
		this.setState({ editMode: EDIT_MODE.NEW, productEditId: null });
	}

	editProduct(productId) {
		this.setState({ editMode: EDIT_MODE.MODIFY, productEditId: productId });
	}

	cancelEdit() {
		this.setState({ editMode: null, productEditId: null });
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
		const { editMode, productEditId } = this.state;
		let success = false;

		if (editMode === EDIT_MODE.NEW) {
			success = db.createProduct(product);
		}
		else if (editMode === EDIT_MODE.MODIFY) {
			success = db.updateProduct(productEditId, product);
		}

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.setState({ editMode: null, productEditId: null });
			this.loadProducts();
		}
	}

	saveCSV() {
		if (db.hasProducts() === false) {
			return;
		}

		const products = db.getAllProducts();
		const success = csvSaver.saveCSV(products, ['name', 'noun', 'nsn', 'count']);

		if (success === false) {
			this.props.dbError();
		}
	}

	buildDataList() {
		const { displayProducts, editMode, productEditId } = this.state;

		if (!displayProducts) {
			return;
		}

		const dataRows = displayProducts.map((product) => {
			const location = db.getLocation(product.locationID);

			if (editMode === EDIT_MODE.MODIFY && productEditId === product.id) {
				return <ProductEditDataRow key={product.id} product={product} location={location} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />;
			}

			const onEditClick = () => this.editProduct(product.id);
			const onDeleteClick = () => this.deleteProduct(product.id);
			return <ProductDataRow key={product.id} product={product} location={location} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
		});

		if (editMode === EDIT_MODE.NEW) {
			dataRows.unshift(<ProductEditDataRow key="NEW" product={new Product()} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />);
		}

		return dataRows;
	}

	render() {
		return (
			<>
				<DataListButtonHeader>
					<Button onClick={this.createProduct} primary>New Product</Button>
					<Button onClick={this.saveCSV} primary>Export CSV</Button>
				</DataListButtonHeader>
				<DataListContainer showSearchBar searchPlaceholder="Search Products" onSearchChange={this.onSearchChange}>
					{this.buildDataList()}
				</DataListContainer>
			</>
		);
	}
}

export default InventoryManualMode;
