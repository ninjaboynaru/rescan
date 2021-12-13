import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
			if (filterConfig.type === DATA_FILTER_TYPE.SEARCH_LIST) {
				return (
					<div className="datalist-filter" key={filterConfig.id}>
						<p className="datalist-filter__label">{filterConfig.label}</p>
						<Select classNamePrefix="datalist-filter__select" className="datalist-filters__select" options={filterConfig.options} onChange={filterConfig.onChange} />
					</div>
				);
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
					<span>{'Filters     '}</span>
					<FontAwesomeIcon icon={headerIcon} />
				</h4>
				{filters}
			</div>
		);
	}
}

export default DataListFilters;
