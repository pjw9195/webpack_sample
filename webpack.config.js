const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: "./src/app.js"
    },
    output: {
        //절대경로
        path: path.resolve('./dist'),
        filename: "[name].js"
    }
}
