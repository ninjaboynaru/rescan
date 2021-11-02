import React from 'react';

export default function Button({ children, onClick, className }) {
	let finalClassName = 'btn';
	if (typeof className === 'string') {
		finalClassName = `${finalClassName} ${className}`;
	}

	return <button type="button" className={finalClassName} onClick={onClick}>{children}</button>;
}
