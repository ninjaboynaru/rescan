import React from 'react';

function HelpInfo() {
	return (
		<div>
			<p>ReScan enables quick inventorying of NSN barcode labeld products</p>
			<hr />
			<p>A barcode scanner is optional though recomended. Scanned products are automaticaly refrenced against a FLIS NSN database</p>
			<hr />
			<p>Inventories are stored as <em>.json</em> files. For example <em><b>conex_inventory.json</b></em>
			</p>
			<hr />
			<p>Store these files in a safe location and dont lose them. ReScan will <b>NOT</b> manage or back them up for you</p>
			<hr />
			<small>
				Contact
				<br />
				ReScan is an <em>Apex Combat Systems</em> product. Contact use with inquiries or questions at <em>simplexCoders@gmail.com</em>
			</small>
		</div>
	);
}

export default HelpInfo;
