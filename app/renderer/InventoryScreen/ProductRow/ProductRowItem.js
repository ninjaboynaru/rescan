import React from 'react';
import Button from '../../Button';

function ProductRowItem({ children, label }) {
	return (
		<div className="product-row__item">
			<p className="product-row__label">{label}</p>
			{children}
		</div>
	);
}

function ProductRowBtn({ children, onClick, outline, danger }) {
	let primary = true;

	if (danger === true) {
		primary = false;
	}

	return <Button className="product-row__btn" onClick={onClick} primary={primary} outline={outline} danger={danger}>{children}</Button>;
}

export { ProductRowItem, ProductRowBtn };
