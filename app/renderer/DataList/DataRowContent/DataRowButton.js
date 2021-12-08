import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Button';

function DataRowButton({ icon, onClick, outline, danger }) {
	let primary = true;

	if (danger === true) {
		primary = false;
	}

	return (
		<Button className="datalist-row__btn" onClick={onClick} primary={primary} outline={outline} danger={danger}>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
}

export default DataRowButton;
