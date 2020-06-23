/**
 * Production build configuration file;
 * pixel-tree, 2020.
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source map',
  entry: {
    main: './src/Main.js',
  },
});
