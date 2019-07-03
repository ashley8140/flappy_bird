const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: path.join(__dirname, './dist/'),
        publicPath: '/static/flappy_bird',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.css', '.json']
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                exclude: /^node_modules$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('postcss-import')(),
                                        require('autoprefixer')()
                                    ]
                                }
                            }
                        }
                    ]
                }),
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
      /*       {
                test: /\.html$/,
                loader: 'html-loader'
            } */
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
        }),
        new ExtractTextPlugin('[name].css')
    ],
    devServer: {
        contentBase: 'dist',
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}