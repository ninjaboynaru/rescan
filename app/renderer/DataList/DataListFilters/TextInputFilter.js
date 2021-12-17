import React from 'react';

class TextInputFilter extends React.Component {
	constructor(props) {
		super(props);

		this.state = { text: '' };
		this.onChangeInternal = this.onChangeInternal.bind(this);
	}

	onChangeInternal(event) {
		const text = event.target.value;
		this.setState({ text });
		this.props.filterConfig.onChange(text);
	}

	render() {
		const { label, placeholder } = this.props.filterConfig;

		return (
			<div className="datalist-filter">
				<p className="datalist-filter__label">
					{label}
				</p>
				<input className="datalist-filter__text-input" type="text" placeholder={placeholder} value={this.state.text} onChange={this.onChangeInternal} />
			</div>
		);
	}
}

export default TextInputFilter;
