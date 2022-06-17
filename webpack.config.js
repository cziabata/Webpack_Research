const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CSSMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if(isProd) {
        config.minimizer = [
            new CSSMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.js",
        analitics: "./analitics.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".json", ".png"],
        alias: {
            "@models": path.resolve(__dirname, "src/models")
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist")
                }
        ]}),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            }, 
            {
                test: /\.(png|svg|jpeg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|)$/,
                use: ["file-loader"]
            }
        ]
    }
}