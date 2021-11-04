import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from '../ScreenTitle';
import Button from '../Button';
import InventoryManualMode from './InventoryModes/InventoryManualMode';
import InventoryScanMode from './InventoryModes/InventoryScanMode';
import BackButton from '../BackButton';

const INVENTORY_MODE = {
	MANUAL: 'MANUAL',
	SCAN: 'SCAN'
};

const db = window.db;

class InventoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mode: INVENTORY_MODE.MANUAL, dbLoading: true, dbError: false };

		this.switchManualMode = this.switchManualMode.bind(this);
		this.switchScanMode = this.switchScanMode.bind(this);
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
				<BackButton />
				<ScreenTitle>{db.getDBName()}</ScreenTitle>
				<div className="inventory-btn-container">
					<Button onClick={this.switchManualMode} primary outline={manualBtnOutline}>Manual Mode</Button>
					<Button onClick={this.switchScanMode} primary outline={scanBtnOutline}>Scan Mode</Button>
				</div>
				{modeUI}
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
