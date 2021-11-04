import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from '../ScreenTitle';
import Button from '../Button';
import InventoryManualMode from './InventoryModes/InventoryManualMode';
import InventoryScanMode from './InventoryModes/InventoryScanMode';

const INVENTORY_MODE = {
	MANUAL: 'MANUAL',
	SCAN: 'SCAN'
};

const db = window.db;
const csvSaver = window.csvSaver;

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: INVENTORY_MODE.MANUAL, dbLoading: true, dbError: false };

		this.switchManualMode = this.switchManualMode.bind(this);
		this.switchScanMode = this.switchScanMode.bind(this);
		this.saveCSV = this.saveCSV.bind(this);
	}

	componentDidMount() {
		this.loadDB();
	}

	loadDB() {
		const openSuccess = db.open(this.props.history.location.state.invFilePath);

		if (openSuccess === false) {
			this.setState({ dbError: true });
		}

		this.setState({ dbLoading: false });
	}

	dbError() {
		this.setState({ dbError: true });
	}

	switchManualMode() {
		this.setState({ mode: INVENTORY_MODE.MANUAL });
	}

	switchScanMode() {
		this.setState({ mode: INVENTORY_MODE.SCAN });
	}

	saveCSV() {
		if (db.hasProducts() === false) {
			return;
		}

		const products = db.getAllProducts();
		const success = csvSaver.saveCSV(products, ['name', 'noun', 'nsn', 'count']);

		if (success === false) {
			this.setState({ dbError: true });
		}
	}

	render() {
		const { mode, dbLoading, dbError } = this.state;

		if (dbError === true) {
			return <p>AN ERROR HAS OCCURRED</p>;
		}
		if (dbLoading === true) {
			return <p>LOADING DATABASE...</p>;
		}

		let modeText;
		let modeUI;

		if (mode === INVENTORY_MODE.MANUAL) {
			modeText = 'Manual Mode';
			modeUI = <InventoryManualMode dbError={this.dbError} />;
		}
		else if (mode === INVENTORY_MODE.SCAN) {
			modeText = 'Scan Mode';
			modeUI = <InventoryScanMode />;
		}

		return (
			<div className="screen-container">
				<ScreenTitle>{db.getDBName()}</ScreenTitle>
				<p>{modeText}</p>
				<div>
					<Button onClick={this.switchManualMode}>Manual Mode</Button>
					<Button onClick={this.switchScanMode}>Scan Mode</Button>
					<Button onClick={this.saveCSV}>Save CSV</Button>
				</div>
				{modeUI}
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
