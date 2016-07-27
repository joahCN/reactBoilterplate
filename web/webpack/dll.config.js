/**
 * Created by mac on 16/7/20.
 */
var webpack = require('webpack');
var path = require('path');
var assetsPath = path.resolve(__dirname, '../build');

module.exports = {
    entry: {
        'dll': ['react', 'react-dom', 'react-router', 'react-bootstrap', 'redux', 'redux-form', 'react-redux', 'superagent']
    },

    output: {
        filename: '[name].bundle.js',
        path: assetsPath,

        // The name of the global variable which the library's
        // require() function will be assigned to
        library: '[name]_lib'
    },

    plugins: [
        new webpack.DllPlugin({
            // The path to the manifest file which maps between
            // modules included in a bundle and the internal IDs
            // within that bundle
            path: path.resolve(assetsPath, '[name]-manifest.json'),
            // The name of the global variable which the library's
            // require function has been assigned to. This must match the
            // output.library option above
            name: '[name]_lib'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
