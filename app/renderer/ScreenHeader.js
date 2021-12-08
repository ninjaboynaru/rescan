import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

function ScreenHeader({ history, children }) {
	const onClick = () => history.goBack();

	return (
		<div className="screen-header">
			<Button onClick={onClick} className="screen-header__btn" primary><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Button>
;
			{children}
		</div>
	);
}

export default withRouter(ScreenHeader);
