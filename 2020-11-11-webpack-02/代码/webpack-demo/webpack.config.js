const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    devtool: 'source-map',

    entry: {
        'index': './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placeholder 占位符 [name] 源资源模块的名称
                        // [ext] 源资源模块的后缀
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./images",
                        // 打包后文件的 url
                        publicPath: '../dist/images',
                        // 小于 100 字节转成 base64 格式
                        limit: 100
                    }
                },
            },

            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 启用/禁用 url() 处理
                            url: true,
                            // 启用/禁用 @import 处理
                            import: true,
                            // 启用/禁用 Sourcemap
                            sourceMap: false
                        }
                    }]
            }
        ]
    },

    plugins: [
        // 把 CleanWebpackPlugin 实例添加到插件执行列表中
        // 插件的具体工作的运行取决于插件中的一个方法 apply
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 模板的路径以及模板名称
            template: './template/index.html',
            // 输出的文件名称，相对于全局的output.path来进行设置的
            filename: 'index.html',
            title: "开课吧"
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        })
    ]

}