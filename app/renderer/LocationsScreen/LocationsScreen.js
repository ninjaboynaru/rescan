import React from 'react';
import Fuse from 'fuse.js';
import withModal from '../withModal';
import Location from '../../all/location';
import ScreenTitle from '../ScreenTitle';
import ScreenHeader from '../ScreenHeader';
import Button from '../Button';
import { DataListContainer, DataListButtonHeader } from '../DataList';
import LocationDataRow from './LocationDataRow';
import LocationEditDataRow from './LocationEditDataRow';
import EDIT_MODE from '../EDIT_MODE';

const db = window.db;

class LocationScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = { locations: null, displayLocations: null, searchText: '', editMode: null, editingLocationID: null, dbError: false };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.editLocation = this.editLocation.bind(this);
		this.createLocation = this.createLocation.bind(this);
		this.saveLocation = this.saveLocation.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	componentDidMount() {
		this.loadLocations();
	}

	onSearchChange(searchText) {
		this.setState({ searchText });
		this.updateDisplayLocations(searchText);
	}

	loadLocations() {
		const locations = db.getLocations();
		this.setState({ locations }, () => {
			this.updateDisplayLocations(this.state.searchText);
		});
	}

	updateDisplayLocations(searchText) {
		if (searchText.trim().length === 0) {
			this.setState((prevState) => ({ displayLocations: prevState.locations }));
		}
		else {
			const searchKeys = ['name'];
			const fuse = new Fuse(this.state.locations, { keys: searchKeys });
			const searchResults = fuse.search(searchText).map((result) => result.item);
			this.setState({ displayLocations: searchResults });
		}
	}

	editLocation(editingLocationID) {
		this.setState({ editingLocationID, editMode: EDIT_MODE.MODIFY });
	}

	createLocation() {
		this.setState({ editMode: EDIT_MODE.NEW });
	}

	saveLocation(modifiedLocation) {
		const { editMode, editingLocationID } = this.state;
		let success;

		if (editMode === EDIT_MODE.MODIFY) {
			success = db.updateLocation(editingLocationID, modifiedLocation);
		}
		else if (editMode === EDIT_MODE.NEW) {
			success = db.createLocation(modifiedLocation);
		}

		if (success === false) {
			return this.setState({ dbError: true });
		}

		this.cancelEdit();
		this.loadLocations();
	}

	cancelEdit() {
		this.setState({ editingLocationID: null, editMode: null });
	}

	deleteLocation(locationID) {
		const success = db.deleteLocation(locationID);

		if (success === false) {
			this.setState({ dbError: true });
		}
		else {
			this.loadLocations();
		}
	}

	deleteLocationConfirmation(locationID) {
		const locationUseCount = db.getLocaitonUseCount(locationID);

		if (locationUseCount === 0) {
			return this.deleteLocation(locationID);
		}

		const confirmDelete = () => {
			this.props.modal.close();
			this.deleteLocation(locationID);
		};

		const cancelDelete = () => this.props.modal.close();

		this.props.modal.open('Are You Sure?', () => (
			<div>
				<p>Are you sure you want to delete this Location?</p>
				<p>
					{locationUseCount}
					{' '}
Products use this locaiton and will be reset to having
					{' '}
					<b>None</b>
					{' '}
location
				</p>
				<div>
					<Button onClick={confirmDelete} danger>Yes</Button>
					<Button onClick={cancelDelete} primary>No</Button>
				</div>
			</div>
		));
	}

	buildDataList() {
		const { displayLocations, editMode, editingLocationID } = this.state;
		if (!displayLocations) {
			return;
		}

		const dataRows = displayLocations.map((location) => {
			if (editingLocationID === location.id) {
				return <LocationEditDataRow key={location.id} location={location} onSaveClick={this.saveLocation} onCancelClick={this.cancelEdit} />;
			}

			const onEditClick = () => this.editLocation(location.id);
			const onDeleteClick = () => this.deleteLocationConfirmation(location.id);
			return <LocationDataRow key={location.id} location={location} onEditClick={onEditClick} onDeletClick={onDeleteClick} />;
		});

		if (editMode === EDIT_MODE.NEW) {
			const newLocation = new Location({});
			dataRows.push(
				<LocationEditDataRow key="NEW" location={newLocation} onSaveClick={this.saveLocation} onCancelClick={this.cancelEdit} />
			);
		}

		return dataRows;
	}

	render() {
		if (this.state.dbError === true) {
			return <p>Were sorry. An error has occured. Please restart the program or contact support</p>;
		}

		return (
			<div className="screen-container">
				<ScreenHeader showBackButton />
				<ScreenTitle>Locations</ScreenTitle>
				<DataListButtonHeader>
					<Button onClick={this.createLocation} primary>New Location</Button>
				</DataListButtonHeader>
				<DataListContainer showSearchBar searchPlaceholder="Search Locations" onSearchChange={this.onSearchChange}>
					{this.buildDataList()}
				</DataListContainer>
			</div>
		);
	}
}

export default withModal(LocationScreen);
