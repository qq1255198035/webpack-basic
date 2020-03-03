let path = require('path');
let HtmlwebpackPlugin = require('html-webpack-plugin');
let MinicssExtractplugin = require('mini-css-extract-plugin');
let OptimizecssassetsWebapckplugin = require('optimize-css-assets-webpack-plugin');
let UglifyjswebpackPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    devServer:{
        hot: true,
        port: 3000,
        progress: true, //进度条
        contentBase: './dist',
        open: true // 自动打开浏览器
    },
    mode: 'production', // 模式 production development
    entry: './src/index.js',
    output:{
        filename: 'bundle.[hash:8].js', //添加哈希
        path: path.resolve(__dirname,'dist')
    },
    //  mode: 'production', 才会走优化配置项
    optimization: {
        minimizer: [
            // 压缩js文件
            new UglifyjswebpackPlugin({
                cache: true,    // 缓存
                parallel: true, // 并发打包
                sourceMap: true // 源码映射
            }),
            // 压缩css文件
            new OptimizecssassetsWebapckplugin()
        ]
    },
    plugins:[
        //html插件 打包后自动生成html文件
        new HtmlwebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, //压缩html 删除双引号
                collapseWhitespace: true, // 变成一行
            }
        }),
        //css插件 打包后自动生成一个css文件
        new MinicssExtractplugin({
            filename: 'main.css',
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                use:{
                    loader: "babel-loader",
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.css$/, 
                use:[
                    MinicssExtractplugin.loader,
                    'css-loader',
                    'postcss-loader' //加前缀 -webkit- 插件
                ]
            },
            {
                test: /\.less$/, 
                use:[
                    MinicssExtractplugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]

            }
        ]
    }
}