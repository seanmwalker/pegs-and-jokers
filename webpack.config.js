const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const copyPlugin = new CopyWebpackPlugin([
    { from: '**/*.woff', to: '.', context: 'client/' },
    { from: '**/*.svg', to: '.', context: 'client/' },
    { from: '**/*.gif', to: '.', context: 'client/' },
    { from: '**/*.css', to: '.', context: 'client/' },
    { from: '**/*.jpg', to: '.', context: 'client/' },
    { from: '**/*.png', to: '.', context: 'client/' }
]);


module.exports = {
    mode: 'development',
    entry: {
        app: ['./client/index.js', 'webpack-hot-middleware/client?reload=true'],

    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: 'dist',
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Pegs And Jokers',
            template: './client/index.html',
            filename: './dist/client/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ],
    }
};