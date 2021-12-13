import React from 'react';
import Select from 'react-select';

function DataRowSearchList({ defaultValue, options, onChange }) {
	return <Select className="datalist-row__searchlist" classNamePrefix="datalist-row__searchlist" options={options} defaultValue={defaultValue} onChange={onChange} />;
}

export default DataRowSearchList;
