const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    }
}