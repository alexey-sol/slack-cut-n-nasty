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
        clientLogLevel: "silent",
        compress: true,
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true,
        host: "0.0.0.0", // "frontend" (the service name) also fits
        hot: true,
        port: process.env.FRONTEND_PORT,
        public: process.env.FRONTEND_URL, // [1]
        quiet: true,
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
    },
});

// [1]. So, in order to make HMR work in Docker container, "public" property must be the
// URL accessible outside the container ("http://localhost:20000" in this case).
