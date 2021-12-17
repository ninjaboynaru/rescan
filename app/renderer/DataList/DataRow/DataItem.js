import React from 'react';

function DataItem({ children, label, error }) {
	let errorUI = null;

	if (error) {
		errorUI = (
			<p className="datalist-row__item-error">
				{error}
			</p>
		);
	}

	return (
		<div className="datalist-row__item">
			<p className="datalist-row__item-label">
				{label}
			</p>
			<div className="datalist-row__item-content">
				{children}
				{errorUI}
			</div>
		</div>
	);
}
export default DataItem;
