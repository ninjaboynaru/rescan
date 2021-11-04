import React from 'react';

export default function Button({ children, onClick, className, primary, danger, outline, minimal }) {
	let finalClassName = 'btn';

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

	return <button type="button" className={finalClassName} onClick={onClick}>{children}</button>;
}
