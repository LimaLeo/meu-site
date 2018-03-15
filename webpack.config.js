const path = require('path'),
    { UglifyJsPlugin } = require('webpack').optimize,
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    SpritesmithPlugin = require('webpack-spritesmith'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin');

const scripts = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader'
    }
}

const styles = {
    test: /\.scss$/,
    exclude: /(node_modules|bower_components)/,
    use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader', options: {
                importLoaders: 1,
                sourceMap: true
            }
        }, {
            loader: 'postcss-loader', options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader', options: {
                sourceMap: true
            }
        }
        ],
        fallback: "style-loader"
    })
}

const images = {
    test: /\.(png|svg|jpg|gif)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: 'images/[name].[ext]',
            publicPath: '../'
        }
    }
}

const fonts = {
    test: /\.(ttf|woff2|woff|eot|otf)$/,
    use: {
        loader: 'file-loader',
        options: {
            outputPath: 'fonts/'
        }
    }
}

const config = {
    entry: {
        app: './src/scripts/App.js'
    },
    devServer: {
        contentBase: './build',
        hot: true
    },
    output: {
        filename: 'js/[name].min.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [scripts, styles, images, fonts]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"]
    },
    devtool: 'source-map',
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: './src/images/icon',
                glob: '*.png'
            },
            target: {
                image: './src/images/sprite.png',
                css: './src/styles/helpers/_sprite.scss'
            },
            apiOptions: {
                cssImageRef: '../images/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: 10
            }
        }),
        new ExtractTextPlugin({
            filename: "css/styles.min.css"
        }),
        new UglifyJsPlugin(
            {
                sourceMap: true,
                output: {
                    comments: false
                }
            }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['build']
            }
        }),
        new HtmlPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};

module.exports = env => {
    env === 'dev' ? true : config.devtool = false;
    return config;
}
