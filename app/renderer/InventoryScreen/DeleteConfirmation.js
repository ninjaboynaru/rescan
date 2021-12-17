import React from 'react';
import Button from '../Components/Button';

function DeleteConfirmation({ onConfirm, onCancel }) {
	return (
		<div>
			<p>Are you sure you want to delete this Product?</p>
			<p>This can not be undone!</p>
			<div>
				<Button onClick={onConfirm} danger>Yes</Button>
				<Button onClick={onCancel} primary>No</Button>
			</div>
		</div>
	);
}

export default DeleteConfirmation;
