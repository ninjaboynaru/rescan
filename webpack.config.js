const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, 'src/index.js'),
	devtool: 'source-map',
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
					presets: ['@babel/preset-react']
				}
			}
		]
	}
};
