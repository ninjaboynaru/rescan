import React from 'react';
import { withRouter } from 'react-router';
import ScreenHeader from '../ScreenHeader';
import ScreenTitle from '../ScreenTitle';
import Button from '../Button';
import { DataListButtonHeader } from '../DataList';
import InventoryManualMode from './InventoryManualMode';
import InventoryScanMode from './InventoryScanMode';

const INVENTORY_MODE = {
	MANUAL: 'MANUAL',
	SCAN: 'SCAN'
};

const db = window.db;

function HelpInfo() {
	return (
		<div>
			<p>ReScan allows you to either manualy create products or scan them in</p>
			<hr />
			<p>Products must have an NSN (13 digit) barcode in order to be scanned</p>
			<hr />
			<p>
After scanning a new product, you must fill in a
				<b> Common Name</b>
				{' '}
for it and press the save button
			</p>
			<hr />
			<p>Scanning the same NSN multiple times will increase that products count. You do not need to press save again on already scanned products</p>
			<hr />
			<p>For both manualy entered, and scanned products, all fileds must be filled in before saving</p>
			<hr />
			<p>
Click the
				<b> export</b>
				{' '}
button in order to export the inventory as an Excel spreadsheet
			</p>
		</div>
	);
}

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: INVENTORY_MODE.MANUAL, dbLoading: true, dbError: false };

		this.switchManualMode = this.switchManualMode.bind(this);
		this.switchScanMode = this.switchScanMode.bind(this);
		this.openLocationsScreen = this.openLocationsScreen.bind(this);
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

	openLocationsScreen() {
		this.props.history.push('/locations');
	}

	render() {
		const { mode, dbLoading, dbError } = this.state;

		if (dbError === true) {
			return <p>AN ERROR HAS OCCURRED</p>;
		}
		if (dbLoading === true) {
			return <p>LOADING DATABASE...</p>;
		}

		let modeUI;
		let manualBtnOutline = false;
		let scanBtnOutline = false;

		if (mode === INVENTORY_MODE.MANUAL) {
			manualBtnOutline = true;
			modeUI = <InventoryManualMode dbError={this.dbError} />;
		}
		else if (mode === INVENTORY_MODE.SCAN) {
			scanBtnOutline = true;
			modeUI = <InventoryScanMode />;
		}

		return (
			<div className="screen-container">
				<ScreenHeader showBackButton helpModalComponent={HelpInfo} />
				<ScreenTitle>{db.getDBName()}</ScreenTitle>
				<DataListButtonHeader>
					<Button className="datalist-button-header__btn" onClick={this.switchManualMode} primary outline={manualBtnOutline}>Manual Mode</Button>
					<Button className="datalist-button-header__btn" onClick={this.switchScanMode} primary outline={scanBtnOutline}>Scan Mode</Button>
					<Button className="datalist-button-header__btn" onClick={this.openLocationsScreen} primary>Locations</Button>
				</DataListButtonHeader>
				{modeUI}
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
