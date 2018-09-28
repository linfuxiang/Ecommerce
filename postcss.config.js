module.exports = {
  plugins: {
    // './plugins/border-radius': {},
    './postcss-plugins/border-1-px': {},
    'postcss-sprites': {
      // stylesheetPath: '',
      spritePath: './src/assets/sprites',
      retina: true, // 支持retina屏幕
      // basePath: '/staticss',
      groupBy(image) {
        // console.log(image.path)
        let groups = /\\src\\views\\(.*?)\\.*/gi.exec(image.path)
        // console.log(groups)
        let groupName = groups ? groups[1] : 'sprite'
        return Promise.resolve(groupName)
        // return Promise.resolve(groupName)
      },
      filterBy: function(image) { // 过滤器
        // console.log(image)
        if (image.url.includes('assets')) {
          return Promise.reject();
        }
        return Promise.resolve()
      },
    },
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 5, // rem小数位
      propList: ['*', '!font'], // 需要转化的属性
      selectorBlackList: [], // 类名黑名单
      replace: true,  // 是否替换原属性
      mediaQuery: false, // 允许在媒体查询中转化px
      minPixelValue: 12 // 需要转化的最小px值
    },
    autoprefixer: {
      browsers: ['last 20 versions', 'Android >= 4.0']
    },
  }
}