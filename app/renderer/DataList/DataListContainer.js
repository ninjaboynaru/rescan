import React from 'react';
import DataListFilters from './DataListFilters/DataListFilters';

function DataListContainer({ children, filterOptions }) {
	let filterUI = null;

	if (filterOptions) {
		filterUI = <DataListFilters filterOptions={filterOptions} />;
	}

	return (
		<div className="datalist-container">
			{filterUI}
			{children}
		</div>
	);
}

export default DataListContainer;
