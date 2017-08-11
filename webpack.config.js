module.exports = {
  context: __dirname + '/resources/src/js',
  entry: {
    'index': './index/index.js'
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
  }
};
