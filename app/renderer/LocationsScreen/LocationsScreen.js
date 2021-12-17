import React from 'react';
import { withRouter } from 'react-router';
import Fuse from 'fuse.js';
import { faArrowCircleLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Location } from '../Models';
import withModal from '../Components/withModal';
import Button from '../Components/Button';
import { ScreenTitle, ScreenFooter } from '../ScreenBaseComponents';
import { DATA_FILTER_TYPE, DataListContainer, DataListButtonHeader, DataListInfoHeader } from '../DataList';
import LocationDataRow from './LocationDataRow';
import LocationEditDataRow from './LocationEditDataRow';
import EDIT_MODE from '../EDIT_MODE';

class LocationScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = { locations: null, displayLocations: null, searchText: '', editMode: null, locationEditID: null, dbError: false };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.editLocation = this.editLocation.bind(this);
		this.createLocation = this.createLocation.bind(this);
		this.saveLocation = this.saveLocation.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.returnToInventoryScreen = this.returnToInventoryScreen.bind(this);
	}

	componentDidMount() {
		this.loadLocations();
	}

	onSearchChange(searchText) {
		this.setState({ searchText });
		this.updateDisplayLocations(searchText);
	}

	loadLocations() {
		const locations = Location.getAll();
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

	editLocation(locationEditID) {
		this.setState({ locationEditID, editMode: EDIT_MODE.MODIFY });
	}

	createLocation() {
		this.setState({ editMode: EDIT_MODE.NEW });
	}

	saveLocation(location) {
		const success = location.save();

		if (success === false) {
			return this.setState({ dbError: true });
		}

		this.cancelEdit();
		this.loadLocations();
	}

	cancelEdit() {
		this.setState({ editMode: null, locationEditID: null });
	}

	deleteLocation(locationID) {
		const success = Location.delete(locationID);

		if (success === false) {
			this.setState({ dbError: true });
		}
		else {
			this.loadLocations();
		}
	}

	deleteLocationConfirmation(locationID) {
		const locationUseCount = Location.getProductUsage(locationID);

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
				<p>{locationUseCount} Products use this locaiton and will be reset to having <b>None</b> location</p>
				<div>
					<Button onClick={confirmDelete} danger>Yes</Button>
					<Button onClick={cancelDelete} primary>No</Button>
				</div>
			</div>
		));
	}

	buildDataList() {
		const { displayLocations, editMode, locationEditID } = this.state;
		if (!displayLocations) {
			return;
		}

		const dataRows = displayLocations.map((location) => {
			const locationUseCount = Location.getProductUsage(location.id);

			if (editMode === EDIT_MODE.MODIFY && locationEditID === location.id) {
				return <LocationEditDataRow key={location.id} location={location} useCount={locationUseCount} onSaveClick={this.saveLocation} onCancelClick={this.cancelEdit} />;
			}

			const onEditClick = () => this.editLocation(location.id);
			const onDeleteClick = () => this.deleteLocationConfirmation(location.id);
			return <LocationDataRow key={location.id} location={location} useCount={locationUseCount} onEditClick={onEditClick} onDeletClick={onDeleteClick} />;
		});

		if (editMode === EDIT_MODE.NEW) {
			const newLocation = new Location({});
			dataRows.push(
				<LocationEditDataRow key="NEW" location={newLocation} onSaveClick={this.saveLocation} onCancelClick={this.cancelEdit} />
			);
		}

		return dataRows;
	}

	buildFilterOptions() {
		return [
			{
				id: 'SEARCH',
				type: DATA_FILTER_TYPE.TEXT_INPUT,
				label: 'Search',
				placeholder: 'Search Locations',
				onChange: this.onSearchChange
			}
		];
	}

	returnToInventoryScreen() {
		this.props.history.goBack();
	}

	render() {
		const { dbError, locations, displayLocations } = this.state;
		let infoHeaderContent = null;

		if (dbError === true) {
			return <p>Were sorry. An error has occured. Please restart the program or contact support</p>;
		}

		if (locations && displayLocations) {
			infoHeaderContent = `Showing ${displayLocations.length} out of ${locations.length} locations`;
		}

		return (
			<div className="screen-container">
				<ScreenTitle>Locations</ScreenTitle>
				<DataListButtonHeader>
					<Button icon={faArrowCircleLeft} className="datalist-button-header__btn" onClick={this.returnToInventoryScreen} primary>Return To Inventory</Button>
					<Button icon={faPlusCircle} className="datalist-button-header__btn" onClick={this.createLocation} primary>New Location</Button>
				</DataListButtonHeader>
				<DataListContainer filterOptions={this.buildFilterOptions()}>
					<DataListInfoHeader>
						{infoHeaderContent}
					</DataListInfoHeader>
					{this.buildDataList()}
				</DataListContainer>
				<ScreenFooter />
			</div>
		);
	}
}

export default withRouter(withModal(LocationScreen));
