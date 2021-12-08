import React from 'react';
import TextInput from '../TextInput';

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
		const { children, searchPlaceholder } = this.props;

		if (this.props.showSearchBar === true) {
			searchBar = <TextInput value={this.state.searchText} onChange={this.onSearchChange} placeholder={searchPlaceholder} fullWidth />;
		}

		return (
			<div className="datalist-container">
				{searchBar}
				{children}
			</div>
		);
	}
}

export default DataListContainer;
