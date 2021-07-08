import dotenv from "dotenv"; // access env variables in Webpack config
import DotenvWebpack from "dotenv-webpack"; // pass env variables to the app
import HtmlWebpackPlugin from "html-webpack-plugin";
import { join } from "path";
import webpack from "webpack";

dotenv.config();

const config: webpack.Configuration = {
    entry: join(__dirname, "src", "index.tsx"),
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
        new DotenvWebpack({ systemvars: true }),
        new HtmlWebpackPlugin({
            template: join(__dirname, "public", "index.html"),
        }),
    ],
};

export default config;
