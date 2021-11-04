import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from './ScreenTitle';
import Button from './Button';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);

		this.onOpenClick = this.onOpenClick.bind(this);
		this.onCreateClick = this.onCreateClick.bind(this);
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

	render() {
		return (
			<div className="screen-container screen-container-centered">
				<ScreenTitle>RESCAN</ScreenTitle>
				<Button onClick={this.onOpenClick} primary className="home-screen-btn">Open Inventory</Button>
				<Button onClick={this.onCreateClick} primary className="home-screen-btn">Create Inventory</Button>
			</div>
		);
	}
}

export default withRouter(HomeScreen);
