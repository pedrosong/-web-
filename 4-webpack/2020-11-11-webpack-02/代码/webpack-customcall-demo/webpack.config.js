const path = require('path');

module.exports = {

    devtool: 'source-map',

    entry: {
        'index': './src/index.js'
    },


    // template: {
    //     'index': 'template/index.html',
    //     'list': 'template/list.html'
    // },

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
                    "style-loader",
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
    }

   

}