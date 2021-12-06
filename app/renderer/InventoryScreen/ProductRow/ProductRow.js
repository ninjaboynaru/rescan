import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductRowItem from './ProductRowItem';
import ProductRowBtn from './ProductRowBtn';

export default function ProductRow({ product, location, onEditClick, onDeleteClick }) {
	let locationName = '----';

	if (location) {
		locationName = location.name;
	}

	return (
		<div className="product-row">
			<ProductRowItem label="Common Name">{product.name}</ProductRowItem>
			<ProductRowItem label="Noun">{product.noun}</ProductRowItem>
			<ProductRowItem label="NSN">{product.nsn}</ProductRowItem>
			<ProductRowItem label="Count">{product.count}</ProductRowItem>
			<ProductRowItem label="Location">{locationName}</ProductRowItem>
			<ProductRowBtn onClick={onEditClick}><FontAwesomeIcon icon={faEdit} /></ProductRowBtn>
			<ProductRowBtn onClick={onDeleteClick} danger><FontAwesomeIcon icon={faTrash} /></ProductRowBtn>
		</div>
	);
}
