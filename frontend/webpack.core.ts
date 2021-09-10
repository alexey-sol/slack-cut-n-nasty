import dotenv from "dotenv"; // access env variables in Webpack config
import DotenvWebpack from "dotenv-webpack"; // pass env variables to the app
import HtmlWebpackPlugin from "html-webpack-plugin";
import { join, resolve } from "path";
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
        alias: {
            "@": resolve(__dirname, "src/"),
            "@config": resolve(__dirname, "src/utils/config/"),
            "@const": resolve(__dirname, "src/utils/const/"),
            "@gql": resolve(__dirname, "src/utils/gql/"),
            "@helpers": resolve(__dirname, "src/utils/helpers/"),
            "@hooks": resolve(__dirname, "src/app/hooks/"),
            "@wrappers": resolve(__dirname, "src/utils/wrappers/"),
        },
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
