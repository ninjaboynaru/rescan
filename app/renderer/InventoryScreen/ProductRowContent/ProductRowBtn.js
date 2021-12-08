import React from 'react';
import Button from '../../Button';

function ProductRowBtn({ children, onClick, outline, danger }) {
	let primary = true;

	if (danger === true) {
		primary = false;
	}

	return <Button className="product-row__btn" onClick={onClick} primary={primary} outline={outline} danger={danger}>{children}</Button>;
}

export default ProductRowBtn;
