import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataRow, DataItem, DataRowText, DataRowButtonGroup, DataRowButton } from '../DataList';

function LocationDataRow({ location, onEditClick, onDeletClick }) {
	return (
		<DataRow>
			<DataItem label="Name"><DataRowText>{location.name}</DataRowText></DataItem>
			<DataRowButtonGroup>
				<DataRowButton icon={faEdit} onClick={onEditClick} />
				<DataRowButton icon={faTrash} onClick={onDeletClick} danger />
			</DataRowButtonGroup>
		</DataRow>
	);
}

export default LocationDataRow;
