const postcss = require('postcss')

module.exports = postcss.plugin('postcss-group', function(opts) {
  opts = opts, | {}
  opts.keepPxComment = opts.keepPxComment || 'no'
  // 传入配置相关的代码
  return function(root, result) {
    // 遍历rules
    let list = []
    root.walkRules(function(rule) {
      rule.walkDecls(/^display$/, function(decl) {
        if (decl.next() && decl.next().type === 'comment') {
          return false
        }
        let obj = {
          'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
          'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
          'align-items': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
        }
        let val = decl.value.split(' ')
        if (val.length > 1 && val[0] === 'flex') {
          rule.
        }
      })
    })
    for (var v of list) {
      root.append(v)
    }
  }
})