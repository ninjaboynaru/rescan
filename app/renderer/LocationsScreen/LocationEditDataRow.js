import React from 'react';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../Models';
import { DataRow, DataItem, DataRowText, DataRowTextInput, DataRowButtonGroup, DataRowButton } from '../DataList';

const MAX_NAME_LENGTH = 200;

class LocationEditDataRow extends React.Component {
	constructor(props) {
		super(props);

		this.modifiedLocation = new Location(this.props.location);
		this.state = { name: this.props.location.name, nameError: null };
		this.onNameChange = this.onNameChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onNameChange(name) {
		this.setState({ name });
		this.modifiedLocation.name = name;
	}

	onSave() {
		const name = this.state.name.trim();
		let nameError = null;

		if (name.length === 0) {
			nameError = 'Name is too short';
		}
		else if (name.length >= MAX_NAME_LENGTH) {
			nameError = 'Name is too long';
		}

		if (nameError) {
			this.setState({ nameError });
			return;
		}

		this.props.onSaveClick(this.modifiedLocation);
	}

	render() {
		const { name, nameError } = this.state;
		const useCount = this.props.useCount;

		return (
			<DataRow>
				<DataItem label="Name" error={nameError}>
					<DataRowTextInput value={name} placeholder="Name" onChange={this.onNameChange} />
				</DataItem>
				<DataItem label="Products Owned">
					<DataRowText>
						{useCount}
					</DataRowText>
				</DataItem>
				<DataRowButtonGroup>
					<DataRowButton icon={faSave} onClick={this.onSave} />
					<DataRowButton icon={faUndo} onClick={this.props.onCancelClick} outline />
				</DataRowButtonGroup>
			</DataRow>
		);
	}
}

export default LocationEditDataRow;
