const { dialog } = require('@electron/remote');

const invFileFilters = [{ name: 'Inventory File', extensions: ['json'] }];

module.exports = {
	showOpenDialog: function showOpenDialog() {
		const filePaths = dialog.showOpenDialogSync({
			title: 'Inventory Selection',
			message: 'Select Inventory File',
			defaultPath: './',
			filters: invFileFilters,
			properties: ['openFile', 'dontAddToRecent']
		});

		if (Array.isArray(filePaths)) {
			return filePaths[0];
		}

		return filePaths;
	},

	showSaveDialog: function showSaveDialog() {
		return dialog.showSaveDialogSync({
			title: 'Inventory Creation',
			message: 'Select New Inventory Location',
			defaultPath: './',
			filters: invFileFilters,
			properties: ['dontAddToRecent']
		});
	}
};
