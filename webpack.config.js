const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: "./app.js"
    },
    output: {
        //절대경로
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {},{},{
            test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_module/

            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
        banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author Version: ${childProcess.execSync('git config user.name')}

        `
    }), new webpack.DefinePlugin({
            TWO: JSON.stringify('1+1'),
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '(개발용)': ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,
                removeComments: true,
            } : false,
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({filename: '[name].css'})] : [])
    ]
}
