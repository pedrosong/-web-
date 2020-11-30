// 当前这个配置文件会被 webpack 所读取，webpack 是基于 nodejs 开发的一个cli工具，实际上这个就是运行在node环境下
// 解析入口 => 分析依赖 => import 等导入 => 解析依赖 => 导入依赖 => 加载依赖的文件数据（二进制） => ? => 打包 => 输出
// ? => 对加载的依赖数据进行处理的过程，默认情况下，webpack会把数据作为js进行处理
// webpack 提供了一个接口：loader，来处理 ？ 那一块的内容解析
const path = require('path');

module.exports = {

    mode: 'df',

    entry: {
        'index': './src/a.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        // [name] webpack 内置给output 的一个变量，会被当前入口所对应的key取代
        filename: '[name].js'
    },

    // 配置模块loader解析规则
    module: {
        // 模块解析规则
        rules: [
            // 每一个规则就一个对象
            {
                // 当前解析的模块id（路径）
                test: /\.txt$/i,
                // 匹配以后所使用的loader
                use: 'raw-loader',
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placeholder 占位符 [name] 源资源模块的名称
                        // [ext] 源资源模块的后缀
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置，相对于全局的outputpath来设置
                        outputPath: "./images",
                        // 打包后文件的 url
                        publicPath: '../dist/images',
                        // 小于 100 字节转成 base64 格式
                        limit: 100
                    }
                }
            },

            // {
            //     test: /\.css$/,
            //     use: {
            //         loader: "css-loader",
            //         options: {
            //             // 启用/禁用 url() 处理
            //             url: true,
            //             // 启用/禁用 @import 处理
            //             import: true,
            //             // 启用/禁用 Sourcemap
            //             sourceMap: false
            //         }
            //     }
            // },

            {
                test: /\.css$/,
                // 先执行css-loader，然后再执行style-loader
                use: ["style-loader", {
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