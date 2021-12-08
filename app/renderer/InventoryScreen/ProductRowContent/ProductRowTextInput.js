import React from 'react';

function ProductRowTextInput({ value, placeholder, onChange, error }) {
	let errorUi;

	if (error) {
		errorUi = <p className="product-row__item__input-error">{error}</p>;
	}

	return (
		<div className="product-row__item__input-container">
			<input className="product-row__item__input" type="text" value={value} placeholder={placeholder} onChange={onChange} />
			{errorUi}
		</div>
	);
}

export default ProductRowTextInput;
