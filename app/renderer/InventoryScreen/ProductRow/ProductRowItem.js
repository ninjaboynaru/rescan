import React from 'react';

function ProductRowItem({ children, label }) {
	return (
		<div className="product-row__item">
			<p className="product-row__label">{label}</p>
			{children}
		</div>
	);
}

export default ProductRowItem;
