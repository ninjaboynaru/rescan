import React from 'react';

export default function TextInput({ value, onChange, label, placeholder, error }) {
	let errorUI;

	if (error) {
		errorUI = <p className="text-input__error">{error}</p>;
	}
	return (
		<div className="text-input">
			<label>{label}</label>
			<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
			{errorUI}
		</div>
	);
}
