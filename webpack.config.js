const path = require("path");
const webpack = require("webpack");
const pjson = require("./package.json");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
module.exports = {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "index.js"),
  output: {
    filename: pjson.name,
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "commonjs2"
  },
  externals: nodeExternals({
    modulesFromFile: {
      exclude: ["devDependencies"]
    }
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules\/fatfs/],
        include: [/node_modules/]
      },
      { test: /\.js$/, loader: "eslint-loader", enforce: "pre" }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: "#!/usr/local/bin/node"
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
};
