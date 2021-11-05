import React from 'react';
import { withRouter } from 'react-router';
import withModal from './withModal';
import ScreenTitle from './ScreenTitle';
import Button from './Button';
import HelpButton from './HelpButton';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.onOpenClick = this.onOpenClick.bind(this);
		this.onCreateClick = this.onCreateClick.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	onOpenClick() {
		const invFilePath = window.dbDialog.showOpenDialog();
		if (invFilePath === undefined) {
			return;
		}

		this.props.history.push({
			pathname: '/inventory',
			state: { invFilePath }
		});
	}

	onCreateClick() {
		this.props.history.push({
			pathname: '/edit/inventory'
		});
	}

	openModal() {
		this.props.modal.open('Help', () => (
			<div>
				<p>ReScan enables quick inventorying of NSN barcode labeld products</p>
				<hr />
				<p>
					A barcode scanner is optional though recomended. Scanned products are automaticaly refrenced against a FLIS NSN database
				</p>
				<hr />
				<p>
					Inventories are stored as
					<em>.json</em>
					{' '}
files. For example
					{' '}
					<em><b>conextInventory.json</b></em>
				</p>
				<hr />
				<p>
					Store these files in a safe location and dont lose them. ReScan will NOT manage or back them up for you
				</p>
				<hr />
				<small>
					Contact
					<br />
					ReScan is an
					{' '}
					<em>Apex Combat Systems</em>
					{' '}
product. Contact use with inquiries or questions at simplexCoders@gmail.com
				</small>
			</div>
		));
	}

	render() {
		return (
			<div className="screen-container screen-container-centered">
				<ScreenTitle>RESCAN</ScreenTitle>
				<Button onClick={this.onOpenClick} primary className="home-screen-btn">Open Inventory</Button>
				<Button onClick={this.onCreateClick} primary className="home-screen-btn">Create Inventory</Button>

				<HelpButton onClick={this.openModal} />
			</div>
		);
	}
}

export default withRouter(withModal(HomeScreen));
