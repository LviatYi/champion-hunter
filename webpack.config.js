const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        ui: './src/ui.ts',
        code: './src/code.ts'
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,},
            {test: /\.css$/, use: ['style-loader', {loader: 'css-loader'}]},
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js|css)$',
            chunks: ['ui'],
        }),
        new HtmlInlineScriptPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000, // 定期轮询文件系统
    },
});