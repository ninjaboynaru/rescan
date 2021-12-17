import React from 'react';

const getAppVersion = window.getAppVersion;

function ScreenFooter() {
	return (
		<div className="screen-footer">
			<div className="screen-footer__content">
				<span>Apex Combat Systems</span>
			</div>
			<div className="screen-footer__content">
				<span>
					{getAppVersion()}
				</span>
			</div>
		</div>
	);
}

export default ScreenFooter;
