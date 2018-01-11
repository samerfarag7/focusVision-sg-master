var path = require('path');
var webpack = require('webpack');

module.exports = function (fabricatorConfig) {

	"use strict";

	var config = {
		entry: {
			'fabricator/scripts/f': fabricatorConfig.src.scripts.fabricator,
			'toolkit/scripts/toolkit': fabricatorConfig.src.scripts.toolkit,
		},
		output: {
			path: path.resolve(__dirname, fabricatorConfig.dest, 'assets'),
			filename: '[name].js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel',
					exclude: /(node_modules|prism\.js)/,
					query: {
						presets: ['es2015', 'stage-0', 'react']
					}
				},
				{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' }
			]
		},
		plugins: [],
		cache: {}
	};

	if (!fabricatorConfig.dev) {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		);
	}

	return config;

};
