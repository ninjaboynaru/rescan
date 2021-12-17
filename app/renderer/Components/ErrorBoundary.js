import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: false };
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {
		if (this.state.error === true) {
			return (
				<div className="error-boundary">
					<h3 className="error-boundary__title">Something Went Wrong</h3>
					<p className="error-boundary__body">
						Sorry, ReScan crashed. Please close the application and try again.
						<br />
						If this issue persists, reach out to us at
						{' '}
						<b>simplexCoders@gmail.com</b>
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
