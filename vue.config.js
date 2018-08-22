let path = require('path')

let sourceRoot = 'src'
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, sourceRoot),
      }
    },
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/common/styles/base.scss";`
      }
    }
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
    //       resources: [path.resolve(__dirname, `./${sourceRoot}/common/styles/base.scss`)]
    //     }
    //   })
  }
}