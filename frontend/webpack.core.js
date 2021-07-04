require("dotenv").config(); // access env variables in Webpack config
const Dotenv = require("dotenv-webpack"); // pass env variables to the app
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { join } = require("path");

module.exports = {
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
        new Dotenv({ systemvars: true }),
        new HtmlWebpackPlugin({
            template: join(__dirname, "public", "index.html"),
        }),
    ],
};
