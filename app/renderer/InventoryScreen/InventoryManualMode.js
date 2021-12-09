import React from 'react';
import Fuse from 'fuse.js';
import Product from '../../all/product';
import Button from '../Button';
import { buildLocationListOptions, LOCATION_ALL_OPTION } from './util';
import { DataListContainer, DataListButtonHeader } from '../DataList';
import DATA_FILTER_TYPE from '../DataList/DATA_FILTER_TYPE';
import ProductDataRow from './ProductDataRow';
import ProductEditDataRow from './ProductEditDataRow';
import EDIT_MODE from '../EDIT_MODE';

const db = window.db;
const csvSaver = window.csvSaver;

class InventoryManualMode extends React.Component {
	constructor(props) {
		super(props);
		this.state = { products: null, displayProducts: null, searchText: '', locationFilter: null, editMode: null, productEditId: null };

		this.createProduct = this.createProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onLocationFilterChange = this.onLocationFilterChange.bind(this);
		this.saveCSV = this.saveCSV.bind(this);
	}

	componentDidMount() {
		this.loadProducts();
	}

	onSearchChange(searchText) {
		this.setState({ searchText }, () => {
			this.updateDisplayProducts();
		});
	}

	onLocationFilterChange(option) {
		this.setState({ locationFilter: option }, () => {
			this.updateDisplayProducts();
		});
	}

	loadProducts() {
		const products = db.getAllProducts();
		this.setState({ products }, () => {
			this.updateDisplayProducts(this.state.searchText);
		});
	}

	updateDisplayProducts() {
		const { products, searchText, locationFilter } = this.state;
		let toShow = products;

		if (locationFilter && locationFilter.value !== LOCATION_ALL_OPTION.value) {
			toShow = toShow.filter((product) => product.locationID === locationFilter.value);
		}

		if (searchText.trim().length !== 0) {
			const searchKeys = ['name', 'noun', 'nsn'];
			const fuse = new Fuse(toShow, { keys: searchKeys });
			toShow = fuse.search(searchText).map((result) => result.item);
		}

		this.setState({ displayProducts: toShow });
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

	buildFilterOptions() {
		const options = [];

		options.push({
			id: 'LOCATION',
			type: DATA_FILTER_TYPE.SEARCH_LIST,
			label: 'Location',
			options: buildLocationListOptions(true, true),
			onChange: this.onLocationFilterChange
		});

		return options;
	}

	render() {
		return (
			<>
				<DataListButtonHeader>
					<Button onClick={this.createProduct} primary>New Product</Button>
					<Button onClick={this.saveCSV} primary>Export CSV</Button>
				</DataListButtonHeader>
				<DataListContainer filterOptions={this.buildFilterOptions()} showSearchBar searchPlaceholder="Search Products" onSearchChange={this.onSearchChange}>
					{this.buildDataList()}
				</DataListContainer>
			</>
		);
	}
}

export default InventoryManualMode;
