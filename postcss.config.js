module.exports = {
  plugins: {
    './plugins/postcss-border1px': {},
    'postcss-sprites': {
      // stylesheetPath: '/',
      spritePath: './dist/static/images/sprites',
      retina: true, // 支持retina屏幕
      // basePath: '',
      // filterBy: function(image) {
      //  Promise.resolve();
      //  Promise.reject();
      // },
      groupBy(image) {
        function spritesGroupBy(image) {
          // console.log(image.path)
          let groups = /\\src\\views\\(.*?)\\.*/gi.exec(image.path)
          // console.log(groups)
          let groupName = groups ? groups[1] : 'sprite';
          image.retina = true
          image.ratio = 1
          if (groupName) {
            let ratio = /@(\d+)x$/gi.exec(groupName)
            if (ratio) {
              ratio = ratio[1]
              while (ratio > 10) {
                ratio = ratio / 10
              }
              image.ratio = ratio
            }
          }
          return Promise.resolve(groupName)
        }
        return spritesGroupBy(image)
        // return []
        // return [
        //   function(image) {
        //     if (image.url.indexOf('sprite1') === -1) {
        //       return Promise.reject();
        //     }
        //     return Promise.resolve('sprite1');
        //   },
        //   function(image) {
        //     if (image.url.indexOf('sprite2') === -1) {
        //       return Promise.reject();
        //     }
        //     return Promise.resolve('sprite2');
        //   }
        // ]
      }
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
// let autoprefixer = require('autoprefixer')
// let pxtorem = require('postcss-pxtorem')
// let border1px = require('./plugins/postcss-border1px')
// let writesvg = require('postcss-write-svg')
// module.exports = {
//     plugins: [
//         border1px(),
//         writesvg(),
//         autoprefixer({
//             browsers: ['last 20 versions', 'Android >= 4.0'],
//             cascade: true,
//             remove: true
//         }),
//         pxtorem({
//             rootValue: 75,
//             unitPrecision: 5, // rem小数位
//             propList: ['*'], // 需要转化的属性
//             selectorBlackList: [], // 类名黑名单
//             replace: true,
//             mediaQuery: false, // 允许在媒体查询中转化px
//             minPixelValue: 12 // 需要转化的最小px值
//         }),
//     ]
// }