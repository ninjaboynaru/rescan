import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductRowItem, ProductRowBtn } from './ProductRowItem';

export default function ProductRow({ product, onEditClick, onDeleteClick }) {
	return (
		<div className="product-row">
			<ProductRowItem label="Common Name">{product.name}</ProductRowItem>
			<ProductRowItem label="Noun">{product.noun}</ProductRowItem>
			<ProductRowItem label="NSN">{product.nsn}</ProductRowItem>
			<ProductRowItem label="Count">{product.count}</ProductRowItem>
			<ProductRowBtn onClick={onEditClick}><FontAwesomeIcon icon={faEdit} /></ProductRowBtn>
			<ProductRowBtn onClick={onDeleteClick} danger><FontAwesomeIcon icon={faTrash} /></ProductRowBtn>
		</div>
	);
}
