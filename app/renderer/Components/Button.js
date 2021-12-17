import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({ children, onClick, className, icon, primary, danger, outline, minimal }) {
	let finalClassName = 'btn';
	let iconElement = null;

	if (icon) {
		iconElement = <FontAwesomeIcon icon={icon} className="btn-icon" />;
	}

	if (primary === true) {
		finalClassName += ' btn-primary';
	}
	else if (danger === true) {
		finalClassName += ' btn-danger';
	}
	else if (minimal === true) {
		finalClassName += ' btn-minimal';
	}

	if (outline === true) {
		finalClassName += ' btn-outline';
	}

	if (typeof className === 'string') {
		finalClassName = `${finalClassName} ${className}`;
	}

	return (
		<button type="button" className={finalClassName} onClick={onClick}>
			{children}
			{iconElement}
		</button>
	);
}
