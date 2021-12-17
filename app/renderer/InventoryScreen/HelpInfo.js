import React from 'react';

function HelpInfo() {
	return (
		<div>
			<p>ReScan allows you to either manualy create products or scan them in</p>
			<hr />
			<p>Products must have an NSN (13 digit) barcode in order to be scanned</p>
			<hr />
			<p>After scanning a new product, you must fill in a <b>Common Name</b> for it and press the save button
			</p>
			<hr />
			<p>Scanning the same NSN multiple times will increase that products count. You do not need to press save again on already scanned products</p>
			<hr />
			<p>For both manualy entered, and scanned products, all fileds must be filled in before saving</p>
			<hr />
			<p>Click the <b>export</b> button in order to export the inventory as an Excel spreadsheet
			</p>
		</div>
	);
}

export default HelpInfo;
