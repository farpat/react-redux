const dev = process.env.NODE_ENV !== 'production';

const path = require('path');

const ManifestPlugin = require('webpack-manifest-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
        devtool: dev ? 'inline-source-map' : false,
        entry: {
            app: [
                './resources/js/index.js',
            ]
        },
        output: {
            path: path.resolve('./public/assets/'),
            filename: dev ? '[name].js' : '[name].[chunkhash:4].js',
            publicPath: (dev ? 'http://localhost:3003' : '') + '/assets/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['last 2 versions']
                                }
                            }],
                            'react',
                        ],
                        plugins:
                            ['transform-class-properties'],
                    }
                },
            ]
        },
        devServer: {
            port: 3003,
            noInfo: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            overlay: true,
            clientLogLevel: 'warning',
            publicPath: '/assets/',
            contentBase: path.resolve('./public'),
        },
        plugins: [],
    }
;

if (!dev) {
    config.plugins.push(
        new ManifestPlugin(),

        new CleanWebpackPlugin('assets', {
            root: path.resolve('./public')
        })
    );
}

module.exports = config;
