const fs = require('fs');
const { dialog } = require('@electron/remote');
const { parse } = require('json2csv');

module.exports = {
	saveCSV: function saveCSV(obj) {
		let csvString;
		try {
			csvString = parse(obj, { excelStrings: true });
		}
		catch {
			return false;
		}

		const filePath = dialog.showSaveDialogSync({
			title: 'Save Spreadsheet',
			message: 'Select new spreadsheet location',
			defaultPath: './',
			filters: [{ name: 'Spreadsheet File', extensions: ['csv'] }],
			properties: ['dontAddToRecent']
		});

		if (!filePath) {
			return true;
		}

		try {
			fs.writeFileSync(filePath, csvString);
		}
		catch {
			return false;
		}

		return true;
	}
};
