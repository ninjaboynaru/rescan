import React from 'react';

function ProductRowItem({ children, label }) {
	return (
		<div className="product-row__item">
			<p className="product-row__label">{label}</p>
			{children}
		</div>
	);
}

function ProductRowBtn({ children, onClick, danger }) {
	let className = 'product-row__btn';

	if (danger) {
		className += ' product-row__btn--danger';
	}

	return <button type="button" className={className} onClick={onClick}>{children}</button>;
}

export { ProductRowItem, ProductRowBtn };
