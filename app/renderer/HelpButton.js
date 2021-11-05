import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export default function HelpButton({ onClick, className }) {
	return <Button primary outline onClick={onClick} className={className}><FontAwesomeIcon icon={faQuestion} /></Button>;
}
