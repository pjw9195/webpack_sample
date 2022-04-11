const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: "./src/app.js"
    },
    output: {
        //절대경로
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    //loader는 아래부터 앞으로 적용
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            },
            {
                //url-loader를 사용하면 웹 상의 base64로 바뀜
                test:/\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    //기존 이미지를 src 경로로 호출하는거를 dist 로 바꿔
                    name: '[name].[ext]?[hash]',
                    limit: 2000, //2kb
                }
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
