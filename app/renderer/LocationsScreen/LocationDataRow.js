import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import DataRow from '../DataList/DataRow/DataRow';
import DataItem from '../DataList/DataRow/DataItem';
import DataRowText from '../DataList/DataRowContent/DataRowText';
import DataRowButton from '../DataList/DataRowContent/DataRowButton';

function LocationDataRow({ location, onEditClick, onDeletClick }) {
	return (
		<DataRow>
			<DataItem label="Name"><DataRowText>{location.name}</DataRowText></DataItem>
			<DataRowButton icon={faEdit} onClick={onEditClick} />
			<DataRowButton icon={faTrash} onClick={onDeletClick} danger />
		</DataRow>
	);
}

export default LocationDataRow;
