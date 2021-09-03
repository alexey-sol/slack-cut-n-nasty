import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { merge } from "webpack-merge";
import path from "path";
import coreConfig from "./webpack.core";
import env from "./src/utils/config/webpack";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = merge<Configuration>(coreConfig, {
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
        host: env.frontendHost,
        hot: true,
        port: env.frontendPort,
        proxy: {
            [`/${env.apiPrefix}`]: env.backendUrlInner,
        },
        public: env.frontendUrl, // [1]
        quiet: false,
        watchOptions: {
            ignored: /node_modules/,
            poll: true,
        },
    },
});

export default config;

// [1]. So, in order to make HMR work in Docker container, "public" property must be the
// URL accessible outside the container ("http://localhost:20000" in this case).
