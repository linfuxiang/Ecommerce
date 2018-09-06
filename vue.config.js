const path = require('path')
const apiMocker = require('webpack-api-mocker')

let sourceRoot = 'src'
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    entry: {
      iconfont: './public/iconfont/iconfont.js'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, sourceRoot),
      }
    },
  },
  css: {
    // module: true,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/common/styles/base.scss";`
      }
    }
  },
  devServer: {
    port: 9527,
    before(app) {
      apiMocker(app, path.resolve(__dirname, `${sourceRoot}/mocks/index.js`))
    },
  },
  chainWebpack: config => {
    // config.module
    //   .rule('scss')
    //   .oneOf('vue')
    //   .use('sass-resources-loader')
    //   .loader('sass-resources-loader')
    //   .tap(options => {
    //     return {
    //       //需要一个全局路径
    //       resources: [`index.scss`]
    //     }
    //   })
    config
      .plugin('html')
      .tap(args => {
        args[0].chunks = ['chunk-vendors', 'chunk-common', 'iconfont', 'app']
        args[0].chunksSortMode = 'manual'
        return args
      })
  }
}