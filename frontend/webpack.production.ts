import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import webpack from "webpack";
import coreConfig from "./webpack.core";

const config: webpack.Configuration = merge(coreConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});

export default config;
