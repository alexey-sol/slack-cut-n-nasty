const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const coreConfig = require("./webpack.core");

module.exports = merge(coreConfig, {
    mode: "development",
    output: {
        publicPath: "/",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({ async: false }),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        host: "0.0.0.0",
        hot: true,
        open: true,
        port: process.env.FRONTEND_PORT,
    },
});
