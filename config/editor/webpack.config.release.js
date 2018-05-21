const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const common = require("./webpack.common.js");

const ROOT_DIR = path.resolve(__dirname, "../..");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin("build", { root: ROOT_DIR }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(js|css)$"),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
