const glob = require('glob')
const htmlHead = require('./src/assets/js/html-head-config')
const getPages = () => {
    var map = {}
    var entryFiles = glob.sync('src/pages' + '/*/main.js')

    entryFiles.forEach(filePath => {
        let chunkName = filePath.split('/')[2]
        let pageHead = htmlHead[chunkName]
        // console.log(chunkName)
        map[chunkName] = {
            entry: filePath, // page 的入口
            template: 'public/index.html', // 模板来源
            filename: chunkName + '.html', // 输出文件名
            title: pageHead ? pageHead.title : htmlHead.index.title,
            meta: pageHead ? pageHead.meta : htmlHead.index.meta,
            chunks: ['chunk-vendors', 'chunk-common', chunkName]
        }
    })

    // console.log(map)
    return map
}
const pages = getPages()

module.exports = {
    productionSourceMap: false,
    pages: pages,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                data: `@import "@/assets/sass/_mixin.scss";`
            }
        }
    },
    chainWebpack: config => {
        const isProd = process.env.NODE_ENV === 'production'
        // console.log(config.optimization)
        if (isProd) {
            // 配置如何展示性能提示
            config.performance
                .hints('warning')
                .maxEntrypointSize(3000000)
                .maxAssetSize(1000000)
                .assetFilter(assetFilename => {
                    // 配置计算性能提示的文件类型
                    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
                })

            config.optimization.splitChunks({
                cacheGroups: {
                    common: {
                        // 在所有组件中引用超过2次的依赖模块
                        name: 'chunk-common',
                        chunks: 'all',
                        minChunks: 2,
                        priority: 10,
                        test: /[\\/]node_modules[\\/]/
                    },
                    vendors: {
                        // 入口js共享的所有代码，包括vue
                        name: 'chunk-vendors',
                        chunks: 'initial', // 注册到入口的模块
                        minChunks: 2, // 最少两个入口点引用
                        priority: 20
                    }
                    // video: {
                    //     // 分离出单独的模块video.js，需要在pages中插入
                    //     name: 'video',
                    //     chunks: 'all',
                    //     priority: 30,
                    //     test: /video.js/
                    // },
                }
            })
        }

        // 为每个html-plugin传递meta参数
        for (let key in pages) {
            config.plugin('html-' + key).tap(args => {
                args[0].meta = pages[key].meta
                return args
            })
        }
    }
}
