import React from 'react';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import DataRow from '../DataList/DataRow/DataRow';
import DataItem from '../DataList/DataRow/DataItem';
import DataRowTextInput from '../DataList/DataRowContent/DataRowTextInput';
import DataRowButton from '../DataList/DataRowContent/DataRowButton';

class LocationEditDataRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = { name: this.props.location.name };
		this.modifiedLocation = { ...this.props.location };
		this.onNameChange = this.onNameChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onNameChange(name) {
		this.setState({ name });
		this.modifiedLocation.name = name;
	}

	onSave() {
		this.props.onSaveClick(this.modifiedLocation);
	}

	render() {
		return (
			<DataRow>
				<DataItem label="Name"><DataRowTextInput value={this.state.name} placeholder="Name" onChange={this.onNameChange} /></DataItem>
				<DataRowButton icon={faSave} onClick={this.onSave} />
				<DataRowButton icon={faUndo} onClick={this.props.onCanelClick} outline />
			</DataRow>
		);
	}
}

export default LocationEditDataRow;
