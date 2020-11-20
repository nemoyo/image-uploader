module.exports = {
	  entry: './babel.js',
	  mode: 'development',
	  devtool: 'inline-source-map',
	  output: {
		      path: __dirname + '/dist',
		      filename: 'babel.js'
		    },
	  module: {
		    	rules: [
				  	  {
						    	  	test:/\.js$/,
						    	  	exclude: /node_modules/,
						    	  	use: [
									  	  	  {
												    	  	  	loader: "babel-loader",
												    	  	  	options: {
																  	  		  presets: [
																				    	  		    "@babel/preset-env",
																				    	  		  ],
																  	  	  	},
												    	  	  },
									  	  	],
						    	  },
				  	],
		    },
	  target: ["web","es5"],
};
