import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

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

export default function ProductRow({ product, onEditClick, onDeleteClick }) {
	return (
		<div className="product-row">
			<ProductRowItem>{product.name}</ProductRowItem>
			<ProductRowItem>{product.noun}</ProductRowItem>
			<ProductRowItem med>{product.nsn}</ProductRowItem>
			<ProductRowItem small>{product.count}</ProductRowItem>
			<ProductRowBtn onClick={onEditClick}><FontAwesomeIcon icon={faEdit} /></ProductRowBtn>
			<ProductRowBtn onClick={onDeleteClick} danger><FontAwesomeIcon icon={faTrash} /></ProductRowBtn>
		</div>
	);
}
