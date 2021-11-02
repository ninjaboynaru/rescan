import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from './ScreenTitle';
import ProductRow from './ProductRow';

const db = window.db;

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = { dbError: false };
		const openSuccess = db.open(this.props.history.location.state.invFilePath);

		if (openSuccess === false) {
			this.state.dbError = true;
		}
	}

	render() {
		const { dbError } = this.state;
		let title;
		let productRows;
		let errorUI = null;

		if (dbError === true) {
			errorUI = <p>ERROR LOADING DATABSE</p>;
			title = 'Inventory Error';
		}
		else {
			title = db.getDBName();
			productRows = db.getAllProducts().map((product) => <ProductRow product={product} key={product.id} />);
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
