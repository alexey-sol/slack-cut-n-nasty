const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true,
    },
};
