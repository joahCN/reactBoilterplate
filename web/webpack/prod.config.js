/**
 * Created by mac on 16/7/15.
 */

var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');


var assetsPath = path.resolve(__dirname, '../build');

module.exports = {
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/../theme/.bootstraprc',
            'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
            './bootstrap.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel', 'eslint-loader']},
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style!css?modules&importLoaders=1&&localIdentName=[local]___[hash:base64:5]!postcss-loader!less?outputStyle=expanded&sourceMap') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style!css?modules&importLoaders=1&&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap') },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    postcss: function () {
        return [
            postcssImport(),
            autoprefixer({ browsers: ['last 3 versions']})
        ];
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../build/dll-manifest.json')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css')
    ]
};