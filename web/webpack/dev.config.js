/**
 * Created by mac on 16/7/15.
 */

var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');

var assetsPath = path.resolve(__dirname, '../build');
var host = "localhost",
    port = 8080;

// var bootstrapConfig = path.resolve(__dirname, "../theme/.bootstraprc");
var fontawesomeConfig = path.resolve(__dirname, "../theme/font-awesome.config.js");
// 'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',

module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            // 'font-awesome-webpack!'+fontawesomeConfig,
            './bootstrap.js'
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /(node_modules|build)/, loaders: ['babel-loader']}, //'eslint-loader'
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.less$/, loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less?outputStyle=expanded&sourceMap' },
            { test: /\.scss$/, loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap' },
            {test: /\.css$/, loader: 'style!css'},
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    postcss: function (webpack) {
        return [
            postcssImport({ addDependencyTo: webpack }),
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
    // externals: {
    //     "jquery": "jQuery"
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../build/dll-manifest.json')
        })
        //either adding --hot in command line or using the following constructor
        // new webpack.HotModuleReplacementPlugin()
    ]
};