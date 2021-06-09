/**
 * Webpack main config.
 */

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/Main.js'
  },
  output: {
    path: __dirname+'/build',
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: './default_template.html',
      filename: '../default.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'file-loader?name=./media/files/[name].[ext]',
			},
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
};
