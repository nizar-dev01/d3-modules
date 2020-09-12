const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssCleanupPlugin = require('css-cleanup-webpack-plugin');

module.exports = {
    mode: 'production',
    output:{
        filename:'main.js',
        path: path.resolve(__dirname,'../dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.[hash].html',
            minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[hash].css'
        }),
        // new CssCleanupPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            outputPath: 'styles'
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}