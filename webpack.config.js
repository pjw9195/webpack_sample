const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

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
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //url-loader를 사용하면 웹 상의 base64로 바뀜
                test:/\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    //기존 이미지를 src 경로로 호출하는거를 dist 로 바꿔
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 2000, //2kb
                }
            }
        ]
    },
    plugins: [new MyWebpackPlugin()]
}
