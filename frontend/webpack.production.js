const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const coreConfig = require("./webpack.core");

module.exports = merge(coreConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});
