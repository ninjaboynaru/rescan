import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import Button from './Button';

function BackButton({ history }) {
	const onClick = () => history.push('/');
	return <Button onClick={onClick} className="screen-top-btn" primary><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Button>;
}

export default withRouter(BackButton);
