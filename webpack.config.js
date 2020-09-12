const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack.common');
const prodConfig = require('./config/webpack.prod');
const devConfig = require('./config/webpack.dev');

module.exports = () => {
    const env = process.env.NODE_ENV;
    switch (env) {
        case 'development':
            return merge(commonConfig, devConfig);
        case 'production':
            return merge(commonConfig, prodConfig);
        default:
            throw new Error('No matching configuration was found!');
    }
}