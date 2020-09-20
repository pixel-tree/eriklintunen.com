/**
 * Dev server config file.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dev',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader?name=./media/visual/[name].[ext]',
			},
      {
				test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
				loader : 'file-loader?name=./media/fonts/[name].[ext]',
			},
    ],
  },
});
