import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataRow, DataItem, DataRowText, DataRowButton } from '../DataList';

export default function ProductRow({ product, location, onEditClick, onDeleteClick }) {
	let locationName = 'None';

	if (location) {
		locationName = location.name;
	}

	return (
		<DataRow>
			<DataItem label="Common Name"><DataRowText>{product.name}</DataRowText></DataItem>
			<DataItem label="Noun"><DataRowText>{product.noun}</DataRowText></DataItem>
			<DataItem label="NSN"><DataRowText>{product.nsn}</DataRowText></DataItem>
			<DataItem label="Count"><DataRowText>{product.count}</DataRowText></DataItem>
			<DataItem label="Location"><DataRowText>{locationName}</DataRowText></DataItem>
			<DataRowButton onClick={onEditClick} icon={faEdit} />
			<DataRowButton danger onClick={onDeleteClick} icon={faTrash} />
		</DataRow>
	);
}
