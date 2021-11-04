const { execFileSync } = require('child_process');

module.exports = function getFLISProduct(nsn) {
	let outputBuffer;

	const productNIIN = nsn.slice(4);
	const fileLocation = 'data/decomp';
	const tablesLocation = 'data/tables';
	const sqlQuery = `SELECT ITEM_NAME,END_ITEM_NAME FROM P_FLIS_NSN WHERE NIIN='${productNIIN}'`;

	try {
		execFileSync(fileLocation, [tablesLocation, sqlQuery]);
	}
	catch (err) {
		if (!err.stdout) {
			return false;
		}

		outputBuffer = err.stdout.toString();
	}

	const rowRegex = (/<.*\|.*>/ig);
	const matchedRows = [...outputBuffer.matchAll(rowRegex)];

	if (matchedRows.length === 0) {
		return;
	}

	const rowString = matchedRows[1][0].slice(1, -1);
	const rowColumns = rowString.split('|');

	const noun = rowColumns[0];
	const endItemsRaw = rowColumns[1];
	let endItems = [];

	if (endItemsRaw) {
		endItems = endItemsRaw.split(';');
	}

	return { noun, endItems };
};
