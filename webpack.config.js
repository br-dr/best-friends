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
            { test: /\.html$/, loader: 'html' },
            { test: /\.js$/, loaders: ['ng-annotate', 'babel'], exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            links: [
                '//fonts.googleapis.com/css?family=Roboto:300,400,700&amp;subset=cyrillic-ext',
                '//ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css',
                '//fonts.googleapis.com/icon?family=Material+Icons'
            ],
            template: path.join(__dirname, 'src', 'index.ejs'),
            appMountId: 'app',
            mobile: true,
            title: 'Best Friends'
        })
    ]
};