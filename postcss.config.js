module.exports = {
  plugins: {
    './plugins/border-radius': {},
    './plugins/border-1-px': {},
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
      }
      // filterBy: function(image) {  // 过滤器
      //  Promise.resolve();
      //  Promise.reject();
      // },
    },
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 5, // rem小数位
      propList: ['*'], // 需要转化的属性
      selectorBlackList: [], // 类名黑名单
      replace: true,
      mediaQuery: false, // 允许在媒体查询中转化px
      minPixelValue: 12 // 需要转化的最小px值
    },
    autoprefixer: {
      browsers: ['last 20 versions', 'Android >= 4.0']
    },
  }
}