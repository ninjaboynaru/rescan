import React from 'react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faQuestion } from '@fortawesome/free-solid-svg-icons';
import withModal from '../Components/withModal';
import Button from '../Components/Button';

function ScreenHeader({ history, children, showBackButton, helpModalComponent, modal }) {
	let backButton;
	let helpButton;

	if (showBackButton) {
		const onBackClick = () => history.goBack();
		backButton = (
			<Button primary onClick={onBackClick} className="screen-header__btn">
				<FontAwesomeIcon icon={faArrowAltCircleLeft} />
			</Button>
		);
	}
	if (helpModalComponent) {
		const onHelpClick = () => modal.open('Help', helpModalComponent);
		helpButton = (
			<Button primary outline onClick={onHelpClick} className="screen-header__btn">
				<FontAwesomeIcon icon={faQuestion} />
			</Button>
		);
	}

	return (
		<div className="screen-header">
			{backButton}
			{helpButton}
			{children}
		</div>
	);
}

export default withRouter(withModal(ScreenHeader));
