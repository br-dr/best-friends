const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'raw', include: /src\// },
            { test: /\.js$/, loaders: ['ng-annotate', 'babel-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template: path.join(__dirname, 'src', 'index.ejs'),
            appMountId: 'app',
            mobile: true,
            title: 'Best Friends'
        })
    ]
};