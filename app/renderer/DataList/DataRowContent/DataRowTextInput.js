import React from 'react';

function DataRowTextInput({ value, placeholder, onChange }) {
	const onChangeInternal = (event) => onChange(event.target.value);
	return (
		<div className="datalist-row__text-input">
			<input type="text" value={value} placeholder={placeholder} onChange={onChangeInternal} />
		</div>
	);
}

export default DataRowTextInput;
