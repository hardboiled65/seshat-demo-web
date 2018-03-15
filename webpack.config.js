const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'static/js'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					hotReload: false,
					loaders: {
						js: 'babel-loader'
					}
				}
			}
		]
	},
	externals: {
		vue: 'Vue',
		'vue-router': 'VueRouter'
	}
}
