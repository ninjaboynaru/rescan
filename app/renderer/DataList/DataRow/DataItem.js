import React from 'react';

function DataItem({ children, label }) {
	return (
		<div className="datalist-row__item">
			<p className="datalist-row__item-label">{label}</p>
			<div className="datalist-row__item-content">
				{children}
			</div>
		</div>
	);
}
export default DataItem;
