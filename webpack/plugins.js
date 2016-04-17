require("dotenv").load();
var webpack = require("webpack");
var commonPlugin = new webpack.optimize.CommonsChunkPlugin("common.js");
var envPlugin = new webpack.DefinePlugin({
	__DEV__: process.env.NODE_ENV === "development",
	"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
});


module.exports = function(opts) {
	var plugins = [
		commonPlugin,
		new webpack.ProvidePlugin({
			React: opts.reactPath,
			ReactDOM: opts.reactDOMPath
		}),
		envPlugin
	];

	return plugins;
};
