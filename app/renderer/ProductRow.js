import React from 'react';

function ProductRowItem({ children, small, med }) {
	let className = ' product-row__item';

	if (small === true) {
		className += ' product-row__item--small';
	}
	else if (med === true) {
		className += ' product-row__item--med';
	}

	return <div className={className}>{children}</div>;
}

export default function ProductRow({ product }) {
	return (
		<div className="product-row">
			<ProductRowItem>{product.name}</ProductRowItem>
			<ProductRowItem>{product.noun}</ProductRowItem>
			<ProductRowItem med>{product.nsn}</ProductRowItem>
			<ProductRowItem small>{product.count}</ProductRowItem>
		</div>
	);
}
