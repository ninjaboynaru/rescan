import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from './ScreenTitle';
import ProductRow from './ProductRow';

const db = window.db;

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbError: false, dbLoaded: false, products: [] };
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

	// eslint-disable-next-line
	editProduct(productId) {
		console.log('CALLED EDIT ON: ', productId);
	}

	deleteProduct(productId) {
		db.deleteProduct(productId);
		this.reloadDB();
	}

	buildProductRows() {
		return this.state.products.map((product) => {
			const onEditClick = () => this.editProduct(product.id);
			const onDeleteClick = () => this.deleteProduct(product.id);

			return <ProductRow product={product} key={product.id} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
		});
	}

	render() {
		const { dbError, dbLoaded } = this.state;
		let title;
		let productRows;
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
			productRows = this.buildProductRows();
		}

		return (
			<div className="screen-container">
				<ScreenTitle>{title}</ScreenTitle>
				<div className="products-container">{productRows}</div>
				{errorUI}
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
