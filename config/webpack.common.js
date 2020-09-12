const path = require('path');
const resolve = (p) => path.resolve(__dirname,'../'+p);
module.exports = {
    entry: './src/main.js',
    mode: process.env.NODE_ENV,
    module:{
        rules:[
            {
                test:/\.html$/,
                use:[
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use:{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[name].[hash].[ext]',
                        outputPath: 'public/images'
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
            
        ]
    },
    resolve:{
        alias:{
            "@": resolve('src')
        }
    }
}