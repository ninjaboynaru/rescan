import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export default function withModal(Component) {
	class WithModal extends React.Component {
		constructor(props) {
			super(props);
			this.state = { show: false, title: '' };

			this.open = this.open.bind(this);
			this.close = this.close.bind(this);
			this.BodyComponent = () => {};
		}

		setBodyComponent(fn) {
			this.BodyComponent = fn;
		}

		open(title, BodyComponent) {
			this.BodyComponent = BodyComponent;
			this.setState({ show: true, title });
		}

		close() {
			this.setState({ show: false, title: '' });
		}

		render() {
			const { show, title } = this.state;
			let modal;

			if (show === true) {
				modal = (
					<div className="modal-wrapper">
						<div className="modal-content">
							<div className="modal-content-header">
								<p className="modal-content__title">
									{title}
								</p>
								<Button danger className="modal-content__exit-btn" onClick={this.close}>
									<FontAwesomeIcon icon={faTimes} />
								</Button>
							</div>
							<div className="modal-content__body">
								{this.BodyComponent()}
							</div>
						</div>
					</div>
				);
			}

			const componentProps = { open: this.open, close: this.close };

			return (
				<>
					<Component modal={componentProps} {...this.props} />
					{modal}
				</>
			);
		}
	}

	return WithModal;
}
