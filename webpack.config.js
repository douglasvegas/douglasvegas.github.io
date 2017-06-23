var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv;
const modelName = argv.env.M;
const contextUrl = path.resolve(__dirname, modelName);
module.exports = {
    devtool: 'source-map',
    context: contextUrl,
    entry: './src/app',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(contextUrl, '/build'),
        publicPath:'http://localhost:7000/',
    },
    module: {
        rules: [
        { 
            test: /\.(js|jsx)$/, 
            use: 'babel-loader', 
            exclude: /node_modules/ 
        },
        {
            test: /\.(css|scss)$/,
            use: ['style-loader','css-loader','sass-loader']
        }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 7000,
        hot: true, // 4
        // 开启服务器的模块热替换(HMR)
        headers: {
        'Access-Control-Allow-Origin': '*', // 5
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 6
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(), // +
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ]
}