// Before publishing module
const webpack = require('webpack');

module.exports = {
    entry: './src/Robot.js',
    output: { filename: './lib/Robot.js' },
    plugins: [],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};
