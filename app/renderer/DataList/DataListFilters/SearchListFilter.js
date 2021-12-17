import React from 'react';
import Select from 'react-select';

function SearchListFilter({ filterConfig }) {
	const { label, options, onChange } = filterConfig;

	return (
		<div className="datalist-filter">
			<p className="datalist-filter__label">
				{label}
			</p>
			<Select classNamePrefix="datalist-filter__select" className="datalist-filter__select" options={options} onChange={onChange} />
		</div>
	);
}

export default SearchListFilter;
