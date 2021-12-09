import React from 'react';
import Select from 'react-select';
import DATA_FILTER_TYPE from './DATA_FILTER_TYPE';

class DataListFilters extends React.Component {
	constructor(props) {
		super(props);
	}

	buildFilters() {
		const filterOptions = this.props.filterOptions;

		if (Array.isArray(filterOptions) === false) {
			return;
		}

		return filterOptions.map((filterConfig) => {
			if (filterConfig.type === DATA_FILTER_TYPE.SEARCH_LIST) {
				return (
					<div className="datalist-filter" key={filterConfig.id}>
						<p className="datalist-filter__label">{filterConfig.label}</p>
						<Select className="datalist-filters-cn__select" options={filterConfig.options} onChange={filterConfig.onChange} />
					</div>
				);
			}

			return null;
		});
	}

	render() {
		return (
			<div className="datalist-filters-container">
				<h3 className="datalist-filters-header">Filters</h3>
				{this.buildFilters()}
			</div>
		);
	}
}

export default DataListFilters;
