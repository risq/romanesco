const path = require("path");
const dirTree = require("directory-tree");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DIST_DIR = path.resolve(ROOT_DIR, "build");
const EXAMPLES_DIR = path.resolve(ROOT_DIR, "examples");

const examplesFiles = dirTree(EXAMPLES_DIR, { extensions: /\.js$/ });

module.exports = {
  entry: {
    editor: path.join(ROOT_DIR, "src/editor/index.js"),
    embeddedViewer: path.join(ROOT_DIR, "src/editor/embedded/embeddedViewer.js"),
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    publicPath: "/",
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
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style/[name].[chunkhash].bundle.css",
    }),
    new HtmlWebpackPlugin({
      template: "src/editor/index.ejs",
      inject: true,
      sourceMap: true,
      chunksSortMode: "dependency",
      excludeChunks: ["embeddedViewer"],
      templateParameters: compilation => ({
        publicPath: compilation.options.output.publicPath,
        examplesFiles,
      }),
    }),
    new MonacoWebpackPlugin({
      languages: ["javascript"],
    }),
    new CopyWebpackPlugin([{ from: "examples", to: "ressources/examples" }]),
  ],
};
