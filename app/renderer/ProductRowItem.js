import React from 'react';

function ProductRowItem({ children, small, med }) {
	let className = 'product-row__item';

	if (small === true) {
		className += ' product-row__item--small';
	}
	else if (med === true) {
		className += ' product-row__item--med';
	}

	return <div className={className}>{children}</div>;
}

function ProductRowBtn({ children, onClick, danger }) {
	let className = 'product-row__btn';

	if (danger) {
		className += ' product-row__btn--danger';
	}

	return <button type="button" className={className} onClick={onClick}>{children}</button>;
}

export { ProductRowItem, ProductRowBtn };
