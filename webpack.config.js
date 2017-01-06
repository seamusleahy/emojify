const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Output locations

const config = {
  // === Source ===
  entry: {
    web: ['./src/web.js']
  },

  // === Output ===
  output: {
    filename: '[name].js',
    path: 'lib',
    publicPath: 'lib',
  },


  // === Configure the file-types ===
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },

      // --- CSS ---
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  postcss: [

    // Dynamically add vendor prefixes to properties that need it
    autoprefixer({
      browsers: ['> 0.5%'], // This is the same as the default for http://caniuse.com
    }),
  ],

  // Allow us to access the window object.
  externals: [
    {
      document: 'document',
    },
  ],
};

module.exports = config;
