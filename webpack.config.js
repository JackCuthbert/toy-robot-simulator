// For local testing
module.exports = {
    entry: './index.js',
    output: { filename: 'bundle.js' },
    plugins: [],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    }
};
