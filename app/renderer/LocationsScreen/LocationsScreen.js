/* eslint-disable react/no-unused-state */

import React from 'react';
import Fuse from 'fuse.js';
import ScreenTitle from '../ScreenTitle';
import BackButton from '../BackButton';
import DataListContainer from '../DataList/DataListContainer';
import LocationDataRow from './LocationDataRow';
import LocationEditDataRow from './LocationEditDataRow';

const db = window.db;

class LocationScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = { locations: null, displayLocations: null, searchText: '', editingLocationID: null, dbError: false };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.editLocation = this.editLocation.bind(this);
		this.deleteLocation = this.deleteLocation.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	componentDidMount() {
		this.loadLocations();
	}

	onSearchChange(searchText) {
		this.setState({ searchText });
		this.updateDisplayProducts(searchText);
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
			const searchResults = fuse.search(searchText).map((result) => ({ ...result }));
			this.setState({ displayLocations: searchResults });
		}
	}

	editLocation(editingLocationID) {
		this.setState({ editingLocationID });
	}

	saveEdit(modifiedLocation) {
		const success = db.updateLocation(this.state.editingLocationID, modifiedLocation);

		if (success === false) {
			return this.setState({ dbError: true });
		}

		this.cancelEdit();
		this.loadLocations();
	}

	cancelEdit() {
		this.setState({ editingLocationID: null });
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

	buildDataList() {
		if (!this.state.displayLocations) {
			return;
		}

		return this.state.displayLocations.map((location) => {
			if (this.state.editingLocationID === location.id) {
				return <LocationEditDataRow key={location.id} location={location} onSaveClick={this.saveEdit} onCancelClick={this.cancelEdit} />;
			}

			const onEditClick = () => this.editLocation(location.id);
			const onDeleteClick = () => this.deleteLocation(location.id);
			return <LocationDataRow key={location.id} location={location} onEditClick={onEditClick} onDeletClick={onDeleteClick} />;
		});
	}

	render() {
		if (this.state.dbError === true) {
			return <p>Were sorry. An error has occured. Please restart the program or contact support</p>;
		}

		return (
			<div className="screen-container">
				<div className="screen-top-buttons">
					<BackButton />
				</div>
				<ScreenTitle>Locations</ScreenTitle>
				<DataListContainer showSearchBar onSearchChange={this.onSearchChange}>
					{this.buildDataList()}
				</DataListContainer>
			</div>
		);
	}
}

export default LocationScreen;
