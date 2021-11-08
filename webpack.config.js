const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
require('dotenv').config();

const production = process.env.PRODUCTION;
let mode = 'development';
let devtool = 'source-map';

if (production === 'true') {
	mode = 'production';
	devtool = false;
}

module.exports = {
	mode,
	devtool,
	entry: path.join(__dirname, 'app/renderer/index.js'),
	target: 'electron-renderer',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['js', 'json'],
			fix: true,
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'babel-loader',
				options: {
					targets: 'last 1 Chrome versions',
					presets: ['@babel/preset-react']
				}
			}
		]
	}
};
