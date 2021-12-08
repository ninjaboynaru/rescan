import React from 'react';
import Select from 'react-select';

function ProductRowSearchList({ defaultValue, options, onChange }) {
	return (
		<div className="product-row__item__input-container">
			<Select className="product-row__item__searchlist" classNamePrefix="product-row__item__searchlist" defaultValue={defaultValue} onChange={onChange} options={options} />
		</div>
	);
}

export default ProductRowSearchList;
