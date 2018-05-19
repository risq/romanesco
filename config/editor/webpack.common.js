const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DIST_DIR = path.resolve(ROOT_DIR, "build");

module.exports = {
  entry: {
    editor: path.join(ROOT_DIR, "src/editor/index.js"),
    viewer: path.join(ROOT_DIR, "src/editor/iframe/viewer.js"),
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js",
    sourceMapFilename: "[file].map",
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: "eslint-loader",
            options: {
              failOnError: false,
            },
          },
        ],
        exclude: path.join(ROOT_DIR, "node_modules"),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.glsl$/,
        use: [
          {
            loader: "webpack-glsl-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].[chunkhash].bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: "src/editor/index.html",
      inject: true,
      sourceMap: true,
      chunksSortMode: "dependency",
      chunks: ["editor"],
    }),
    new MonacoWebpackPlugin({
      languages: ["javascript"],
    }),
  ],
};
