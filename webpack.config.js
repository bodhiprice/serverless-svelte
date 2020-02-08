const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  devtool: 'nosources-source-map',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
};

// const webpack = require('webpack');
// const path = require('path');
// const config = require('sapper/config/webpack.js');
// const pkg = require('./package.json');

// const mode = process.env.NODE_ENV;
// const dev = mode === 'development';

// const alias = { svelte: path.resolve('node_modules', 'svelte') };
// const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
// const mainFields = ['svelte', 'module', 'browser', 'main'];

// module.exports = {
// 	client: {
// 		entry: config.client.entry(),
// 		output: config.client.output(),
// 		resolve: { alias, extensions, mainFields },
// 		module: {
// 			rules: [
// 				{
// 					test: /\.(svelte|html)$/,
// 					use: {
// 						loader: 'svelte-loader',
// 						options: {
// 							dev,
// 							hydratable: true,
// 							hotReload: false // pending https://github.com/sveltejs/svelte/issues/2377
// 						}
// 					}
// 				}
// 			]
// 		},
// 		mode,
// 		plugins: [
// 			// pending https://github.com/sveltejs/svelte/issues/2377
// 			// dev && new webpack.HotModuleReplacementPlugin(),
// 			new webpack.DefinePlugin({
// 				'process.browser': true,
// 				'process.env.NODE_ENV': JSON.stringify(mode)
// 			}),
// 		].filter(Boolean),
// 		devtool: dev && 'inline-source-map'
// 	},

// 	server: {
// 		entry: config.server.entry(),
// 		output: config.server.output(),
// 		target: 'node',
// 		resolve: { alias, extensions, mainFields },
// 		externals: Object.keys(pkg.dependencies).concat('encoding'),
// 		module: {
// 			rules: [
// 				{
// 					test: /\.(svelte|html)$/,
// 					use: {
// 						loader: 'svelte-loader',
// 						options: {
// 							css: false,
// 							generate: 'ssr',
// 							dev
// 						}
// 					}
// 				}
// 			]
// 		},
// 		mode: process.env.NODE_ENV,
// 		performance: {
// 			hints: false // it doesn't matter if server.js is large
// 		}
// 	},

// 	serviceworker: {
// 		entry: config.serviceworker.entry(),
// 		output: config.serviceworker.output(),
// 		mode: process.env.NODE_ENV
// 	}
// };
