const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssCleanupPlugin = require('css-cleanup-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:'css/[name].[hash].css',
        }),
        // new CssCleanupPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}