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

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoader = extra => {
    const loader = [ MiniCssExtractPlugin.loader, "css-loader" ];
    if(extra) {
        loader.push(extra);
    }
    return loader;
}
const jsLoaders = () => {
    let loaders = [
        {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ]
    /*if(isDev) {
        loaders.push("eslint-loader")
    }*/
    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.jsx",
        analitics: "./analitics.ts",
    },
    output: {
        filename: filename("js"),
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
    devtool: isDev ?  "source-map" : "",
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
            filename: filename("css"),
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, "css-loader" ]
            }, 
            {
                test: /\.less$/,
                use: cssLoader("less-loader") //it's just webpack less loader, also must be installed less package
            }, 
            {
                test: /\.s[ac]ss$/,
                use: cssLoader("sass-loader") //it's just webpack sass loader, also must be installed main sass package
            },
            {
                test: /\.(png|svg|jpeg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|)$/,
                use: ["file-loader"]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript']
                  }
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            }
        ]
    }
}