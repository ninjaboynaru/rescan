import React from 'react';
import Fuse from 'fuse.js';
import { faPlusCircle, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { Product, Location } from '../../Models';
import withModal from '../../Components/withModal';
import Button from '../../Components/Button';
import { buildLocationListOptions, LOCATION_ALL_OPTION } from '../util';
import { DATA_FILTER_TYPE, DataListContainer, DataListButtonHeader, DataListInfoHeader } from '../../DataList';
import ProductDataRow from '../ProductDataRows/ProductDataRow';
import ProductEditDataRow from '../ProductDataRows/ProductEditDataRow';
import DeleteConfirmation from '../DeleteConfirmation';
import EDIT_MODE from '../../EDIT_MODE';

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
		const products = Product.getAll();
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
		const success = Product.delete(productId);

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.loadProducts();
		}
	}

	deleteProductConfirmation(productID) {
		const confirmDelete = () => {
			this.props.modal.close();
			this.deleteProduct(productID);
		};
		const cancelDelete = () => this.props.modal.close();

		this.props.modal.open('Are You Sure?', () => <DeleteConfirmation onConfirm={confirmDelete} onCancelClick={cancelDelete} />);
	}

	saveProduct(product) {
		const success = product.save();

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.setState({ editMode: null, productEditId: null });
			this.loadProducts();
		}
	}

	saveCSV() {
		if (Product.someExist() === false) {
			return;
		}

		const products = Product.getAll({ appendLocation: true });
		const success = csvSaver.saveCSV(products, ['name', 'noun', 'nsn', 'count', 'location']);

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
			const location = Location.get(product.locationID);

			if (editMode === EDIT_MODE.MODIFY && productEditId === product.id) {
				return <ProductEditDataRow key={product.id} product={product} location={location} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />;
			}

			const onEditClick = () => this.editProduct(product.id);
			const onDeleteClick = () => this.deleteProductConfirmation(product.id);
			return <ProductDataRow key={product.id} product={product} location={location} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
		});

		if (editMode === EDIT_MODE.NEW) {
			dataRows.unshift(<ProductEditDataRow key="NEW" product={new Product()} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />);
		}

		return dataRows;
	}

	buildFilterOptions() {
		return [
			{
				id: 'LOCATION',
				type: DATA_FILTER_TYPE.SEARCH_LIST,
				label: 'Location',
				options: buildLocationListOptions(true, true),
				onChange: this.onLocationFilterChange
			},
			{
				id: 'SEARCH',
				type: DATA_FILTER_TYPE.TEXT_INPUT,
				label: 'Search',
				placeholder: 'Search Products',
				onChange: this.onSearchChange
			}
		];
	}

	render() {
		const { products, displayProducts } = this.state;
		let infoHeaderContent = null;

		if (products && displayProducts) {
			infoHeaderContent = `Showing ${displayProducts.length} out of ${products.length} products`;
		}

		return (
			<>
				<DataListButtonHeader>
					<Button icon={faPlusCircle} className="datalist-button-header__btn" onClick={this.createProduct} primary>New Product</Button>
					<Button icon={faFileCsv} className="datalist-button-header__btn" onClick={this.saveCSV} primary>Export CSV</Button>
				</DataListButtonHeader>
				<DataListContainer filterOptions={this.buildFilterOptions()}>
					<DataListInfoHeader>
						{infoHeaderContent}
					</DataListInfoHeader>
					{this.buildDataList()}
				</DataListContainer>
			</>
		);
	}
}

export default withModal(InventoryManualMode);
