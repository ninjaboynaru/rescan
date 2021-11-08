module.exports = {
	packagerConfig: {
		name: 'rescan',
		icon: 'notepad.ico',
		ignore: [
			'app/renderer',
			'linting',
			'eslintrc.js',
			'.gitattributes',
			'.gitignore',
			'forge-config.js',
			'README*',
			'webpack.config.js',
			'.env',
		]
	},
	makers: [
		{
			name: '@electron-forge/maker-zip'
		}
	]
}