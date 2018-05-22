const merge = require("webpack-merge");
const path = require("path");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const common = require("./webpack.common.js");

const ROOT_DIR = path.resolve(__dirname, "../..");
const DIST_DIR = path.resolve(ROOT_DIR, "build");

const PORT = process.env.PORT || 8080;

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-eval-source-map",
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Development server is running at http://localhost:${PORT}`],
      },
    }),
    new HardSourceWebpackPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: PORT,
    quiet: true,
    contentBase: path.join(DIST_DIR, "app"),
    clientLogLevel: "error",
    historyApiFallback: true,
    inline: true, // live reloading
    stats: {
      colors: true,
      reasons: true,
      chunks: false,
      modules: false,
    },
  },
});
