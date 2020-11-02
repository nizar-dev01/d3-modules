const
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackInjector = require('html-webpack-injector'),
    resolve = (p) => path.resolve(__dirname,'../'+p),
    isProd = () => process.env.NODE_ENV === 'production',
    minify = isProd() ? {
        removeAttributeQuotes:false,
        collapseWhitespace:false,
        removeComments:false
    } : null,
    filename =
        (name,ext='html') => isProd() ?
            `${name}.[hash].${ext}` :
            `${name}.${ext}`
const
    htmlFactory = config =>{
        const {
            inject = true, template, filename,
            favicon = './src/assets/favicon.ico',
            minification = minify, chunks
        } = config
        return new HtmlWebpackPlugin({
            inject, template, filename,
            favicon, minification, chunks
        })
    }

module.exports = {
    entry: {
        face: './src/js/face.js',
        barchart: './src/js/barchart.js',
        test: './src/js/test.js'
    },
    output:{
        filename:'js/[name].[hash].js',
        path: path.resolve(__dirname,'../dist')
    },
    mode: process.env.NODE_ENV,
    plugins:[
        htmlFactory({
            template: './src/index.html',
            filename: filename('index'),
            chunks:['face','homestyle_head']
        }),
        htmlFactory({
            template: './src/chart.html',
            filename: filename('chart'),
            chunks:['barchart'], // by html-webpack-injector
        }),
        htmlFactory({
            template: './src/test.html',
            filename: filename('test'),
            chunks:['test'], // by html-webpack-injector
        }),
        new HtmlWebpackInjector()
    ],
    module:{
        rules:[
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