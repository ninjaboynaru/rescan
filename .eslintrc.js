const path = require('path');

module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"plugin:react/recommended",
		"airbnb",
		path.resolve(__dirname, 'linting/.eslintrc-chox.js'),
		path.resolve(__dirname, 'linting/.eslintrc-react.js'),
		path.resolve(__dirname, 'linting/.eslintrc-import.js'),
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	]
};
