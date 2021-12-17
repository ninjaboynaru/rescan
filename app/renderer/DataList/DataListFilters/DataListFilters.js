import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import TextInputFilter from './TextInputFilter';
import SearchListFilter from './SearchListFilter';
import DATA_FILTER_TYPE from './DATA_FILTER_TYPE';

class DataListFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showFilters: false };
		this.toggleFilters = this.toggleFilters.bind(this);
	}

	buildFilters() {
		const filterOptions = this.props.filterOptions;

		if (Array.isArray(filterOptions) === false) {
			return;
		}

		const filters = filterOptions.map((filterConfig) => {
			if (filterConfig.type === DATA_FILTER_TYPE.TEXT_INPUT) {
				return <TextInputFilter filterConfig={filterConfig} key={filterConfig.id} />;
			}
			if (filterConfig.type === DATA_FILTER_TYPE.SEARCH_LIST) {
				return <SearchListFilter filterConfig={filterConfig} key={filterConfig.id} />;
			}

			return null;
		});

		return (
			<div className="datalist-filters-filters">
				{filters}
			</div>
		);
	}

	toggleFilters() {
		this.setState((prevState) => ({
			showFilters: !prevState.showFilters
		}));
	}

	render() {
		const { showFilters } = this.state;
		let filters = null;
		let headerIcon = faChevronRight;

		if (showFilters) {
			filters = this.buildFilters();
			headerIcon = faChevronDown;
		}

		return (
			<div className="datalist-filters-container">
				<h4 className="datalist-filters-header" onClick={this.toggleFilters}>
					<span>
						{'Filters     '}
					</span>
					<FontAwesomeIcon icon={headerIcon} />
				</h4>
				{filters}
			</div>
		);
	}
}

export default DataListFilters;
