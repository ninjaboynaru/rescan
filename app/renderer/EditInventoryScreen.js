import React from 'react';
import { withRouter } from 'react-router';
import { ScreenHeader, ScreenFooter, ScreenTitle } from './ScreenBaseComponents';
import Button from './Components/Button';
import TextInput from './Components/TextInput';

class EditInventoryScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = { name: '', nameFieldError: false, createError: false };
		this.onNameChange = this.onNameChange.bind(this);
		this.saveInventory = this.saveInventory.bind(this);
	}

	onNameChange(event) {
		this.setState({ name: event.target.value });
	}

	saveInventory() {
		if (this.state.name.trim().length === 0) {
			this.setState({ nameFieldError: true });
			return;
		}

		const invFilePath = window.dbDialog.showSaveDialog();

		if (invFilePath === undefined) {
			return;
		}

		const createSuccess = window.db.create(invFilePath, this.state.name);

		if (createSuccess === false) {
			this.setState({ createError: true });
		}
		else {
			this.props.history.push({
				pathname: '/inventory',
				state: { invFilePath }
			});
		}
	}

	render() {
		const { name, nameFieldError, createError } = this.state;
		let nameFieldErrorText;
		let createErrorText;

		if (nameFieldError === true) {
			nameFieldErrorText = 'Name Is Invalid';
		}
		if (createError === true) {
			createErrorText = 'Error creating database';
		}

		return (
			<div className="screen-container">
				<ScreenHeader showBackButton />
				<ScreenTitle>New Inventory</ScreenTitle>
				<div>
					<TextInput value={name} onChange={this.onNameChange} label="Name" placeholder="Inventory Name" error={nameFieldErrorText} fullWidth />
					<Button onClick={this.saveInventory} primary>Save</Button>
				</div>
				{createErrorText}
				<ScreenFooter />
			</div>
		);
	}
}

export default withRouter(EditInventoryScreen);
