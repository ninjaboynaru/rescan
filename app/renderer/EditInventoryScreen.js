import React from 'react';
import { withRouter } from 'react-router';
import ScreenTitle from './ScreenTitle';
import TextInput from './TextInput';
import Button from './Button';
import BackButton from './BackButton';

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
				<BackButton />
				<ScreenTitle>New Inventory</ScreenTitle>
				<div>
					<TextInput value={name} onChange={this.onNameChange} label="Name" placeholder="Inventory Name" error={nameFieldErrorText} fullWidth />
					<Button onClick={this.saveInventory} primary>Save</Button>
				</div>
				{createErrorText}
			</div>
		);
	}
}

export default withRouter(EditInventoryScreen);
