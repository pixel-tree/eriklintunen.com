/**
 * Production build config file.
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source map',
  module: {
    rules: [
      {
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader?name=./media/visual/[name].[ext]',
			},
      {
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=./media/fonts/[name].[ext]',
			},
    ],
  },
});
