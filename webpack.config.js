var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname + '/resources/src/js',
  entry: {
    'index': ['es6-promise', 'whatwg-fetch', './index/index.js']
  },
  output: {
    path: __dirname + '/resources/dist/js',
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets: [
            ["env", {
              "targets": {
                "browsers": ["last 2 versions"]
              },
              "loose": true
            }],
            ['react']
          ],
          plugins: [
            // https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy#note-order-of-plugins-matters
            "transform-decorators-legacy",
            "transform-class-properties"
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          dead_code: true
        }
      }
    })
  ]
};
