import React from 'react';

function ProductRowItem({ children }) {
	return <div className="product-row__item">{children}</div>;
}

function ProductRowBtn({ children, onClick, danger }) {
	let className = 'product-row__btn';

	if (danger) {
		className += ' product-row__btn--danger';
	}

	return <button type="button" className={className} onClick={onClick}>{children}</button>;
}

export { ProductRowItem, ProductRowBtn };
