import React from 'react';
import TextInput from '../TextInput';
import DataListFilters from './DataListFilters';

class DataListContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { searchText: '' };
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	onSearchChange(event) {
		const searchText = event.target.value;
		this.setState({ searchText });
		this.props.onSearchChange(searchText);
	}

	render() {
		let searchBar = null;
		let filterUI = null;
		const { children, showSearchBar, searchLabel, searchPlaceholder, filterOptions } = this.props;

		if (showSearchBar === true) {
			searchBar = <TextInput value={this.state.searchText} onChange={this.onSearchChange} label={searchLabel} placeholder={searchPlaceholder} fullWidth />;
		}

		if (filterOptions) {
			filterUI = <DataListFilters filterOptions={filterOptions} />;
		}

		return (
			<div className="datalist-container">
				{searchBar}
				{filterUI}
				{children}
			</div>
		);
	}
}

export default DataListContainer;
