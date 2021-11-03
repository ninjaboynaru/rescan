import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from './ScreenTitle';
import ProductRow from './ProductRow';
import ProductEditRow from './ProductEditRow';
import Button from './Button';

const db = window.db;

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbError: false, dbLoaded: false, products: [], editingProductId: null };

		this.createProduct = this.createProduct.bind(this);
		this.editProduct = this.editProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	componentDidMount() {
		this.reloadDB();
	}

	reloadDB() {
		if (this.state.dbLoaded === false) {
			const openSuccess = db.open(this.props.history.location.state.invFilePath);

			if (openSuccess === false) {
				this.setState({ dbError: true });
				return;
			}

			this.setState({ products: db.getAllProducts(), dbLoaded: true });
		}
		else {
			this.setState({ products: db.getAllProducts() });
		}
	}

	createProduct() {
		this.setState({ editingProductId: 'NEW' });
	}

	editProduct(productId) {
		this.setState({ editingProductId: productId });
	}

	deleteProduct(productId) {
		const operatonSuccess = db.deleteProduct(productId);

		if (operatonSuccess === false) {
			this.setState({ dbError: true });
			return;
		}

		this.reloadDB();
	}

	saveEdit(modifiedProduct) {
		const { editingProductId } = this.state;
		let operationSuccess;

		if (editingProductId === 'NEW') {
			operationSuccess = db.createProduct(modifiedProduct);
		}
		else {
			operationSuccess = db.updateProduct(this.state.editingProductId, modifiedProduct);
		}

		if (operationSuccess === false) {
			this.setState({ dbError: true });
			return;
		}

		this.setState({ editingProductId: null });
		this.reloadDB();
	}

	cancelEdit() {
		this.setState({ editingProductId: null });
	}

	buildProductRows() {
		const rows = this.state.products.map((product) => {
			const onEditClick = () => this.editProduct(product.id);
			const onDeleteClick = () => this.deleteProduct(product.id);

			let rowUI;

			if (this.state.editingProductId === product.id) {
				rowUI = <ProductEditRow key={product.id} product={product} onSaveClick={this.saveEdit} onCancelClick={this.cancelEdit} />;
			}
			else {
				rowUI = <ProductRow key={product.id} product={product} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
			}

			return rowUI;
		});

		if (this.state.editingProductId === 'NEW') {
			rows.unshift(<ProductEditRow key="NEW" product={null} onSaveClick={this.saveEdit} onCancelClick={this.cancelEdit} />);
		}

		return rows;
	}

	render() {
		const { dbError, dbLoaded } = this.state;
		let title;
		let productRows;
		let buttonsContainer;
		let errorUI = null;

		if (dbError === true) {
			errorUI = <p>ERROR LOADING DATABSE</p>;
			title = 'Inventory Error';
		}
		else if (dbLoaded === false) {
			title = 'Loading DB';
		}
		else {
			title = db.getDBName();
			buttonsContainer = <div><Button onClick={this.createProduct}>New Product</Button></div>;
			productRows = this.buildProductRows();
		}

		return (
			<div className="screen-container">
				<ScreenTitle>{title}</ScreenTitle>
				{buttonsContainer}
				<div className="products-container">{productRows}</div>
				{errorUI}
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
