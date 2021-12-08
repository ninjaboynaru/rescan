import React from 'react';
import Button from '../../Button';

function DataRowButton({ children, onClick, outline, danger }) {
	let primary = true;

	if (danger === true) {
		primary = false;
	}

	return <Button className="datalist-row__btn" onClick={onClick} primary={primary} outline={outline} danger={danger}>{children}</Button>;
}

export default DataRowButton;
