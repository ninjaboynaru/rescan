import React from 'react';
import { withRouter } from 'react-router';
import { faHandRock, faBarcode, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { ScreenHeader, ScreenFooter, ScreenTitle } from '../ScreenBaseComponents';
import Button from '../Components/Button';
import { DataListButtonHeader } from '../DataList';
import HelpInfo from './HelpInfo';
import InventoryManualMode from './SubScreens/InventoryManualMode';
import InventoryScanMode from './SubScreens/InventoryScanMode';

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
		this.openLocationsScreen = this.openLocationsScreen.bind(this);
		this.dbError = this.dbError.bind(this);
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
				<ScreenTitle>
					{db.getDBName()}
				</ScreenTitle>
				<DataListButtonHeader>
					<Button icon={faHandRock} className="datalist-button-header__btn" onClick={this.switchManualMode} primary outline={manualBtnOutline}>Manual Mode</Button>
					<Button icon={faBarcode} className="datalist-button-header__btn" onClick={this.switchScanMode} primary outline={scanBtnOutline}>Scan Mode</Button>
					<Button icon={faBoxOpen} className="datalist-button-header__btn" onClick={this.openLocationsScreen} primary>Locations</Button>
				</DataListButtonHeader>
				{modeUI}
				<ScreenFooter />
			</div>
		);
	}
}

export default withRouter(InventoryScreen);
