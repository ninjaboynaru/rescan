import React from 'react';

export default function TextInput({ value, onChange, label, placeholder, error, fullWidth }) {
	let errorUI;
	let containerClassName = 'text-input';

	if (error) {
		errorUI = (
			<p className="text-input__error">
				{error}
			</p>
		);
	}

	if (fullWidth === true) {
		containerClassName += ' text-input-full-width';
	}

	return (
		<div className={containerClassName}>
			<label>
				{label}
			</label>
			<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
			{errorUI}
		</div>
	);
}
