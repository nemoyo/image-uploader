module.exports = {
	  entry: './js/app.js',
	  mode: 'development',
	  devtool: 'inline-source-map',
	  output: {
		      path: __dirname + '/dist',
		      filename: 'bundle.js'
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
