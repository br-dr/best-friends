const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'raw', include: /src\// },
            { test: /\.js$/, loaders: ['ng-annotate', 'babel-loader'], exclude: /node_modules/ }
        ]
    }
};