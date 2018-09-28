const postcss = require('postcss')

module.exports = postcss.plugin('postcss-border-1-px', function(opts) {
  opts = opts || {}
  opts.keepPxComment = opts.keepPxComment || 'no'
  // 传入配置相关的代码
  return function(root, result) {
    // 遍历root
    root.walkRules(function(rule) {
      // 只识别border[-top|-right|-bottom|-left]: 1px solid [color];
      rule.walkDecls(/^border(\-(top|left|bottom|right))*$/, function(decl) {
        // 如果不是Declaration，则忽略
        if (decl.type !== 'decl') {
          return false
        }
        // 只有针对postcss处理的属性才使用 ==> _border: 1px...
        if (!/\_$/.test(decl.raws.before)) {
          return false
        }
        // 如果属性值不是1px solid red格式的，则忽略
        if (!/^1px .+ .+$/.test(decl.value)) {
          return false
        }
        // 如果带有注释/*no*/，则忽略
        let next = decl.next()
        if (
          next &&
          typeof next === 'object' &&
          next.type === 'comment' &&
          next.text.trim() === opts.keepPxComment
        ) {
          return false
        }
        // 如果规则中有border-radius属性，则忽略
        let hasRadius = false
        rule.walkDecls(/^border-radius$/, function(decl) {
          // if (/\_$/.test(decl.raws.before)) {
          hasRadius = true
          // }
        })
        if (hasRadius) {
          return false
        }

        let rules = []
        // 新增以下三个属性：
        // 1. border: 0;
        rules.push({ prop: 'border', value: '0' })

        // 2. border[-top...]: 1px solid;
        let attrs = decl.prop.match(/(top|left|bottom|right)/g)
        if (attrs) {
          for (let i = 0; i < attrs.length; i++) {
            rules.push({ prop: 'border-' + attrs[i], value: '1px solid' })
          }
        } else {
          rules.push({ prop: 'border', value: '1px solid' })
        }

        // 3. border-image: svg(1px-border param(--color ${color})) 1 stretch;
        let color = decl.value.match(/rgba?\(.+\)/)
        if (color && color[0]) {
          color = color[0]
        } else {
          decl.value.split(' ').forEach(function(it) {
            if (!/\dpx/.test(it) && !/(solid)|(dashed)|(dotted)/.test(it)) {
              color = it
            }
          })
        }
        color = color || '#e4e6e7'
        rules.push({ prop: 'border-image', value: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px'%3E%3Crect fill='transparent' width='100%25' height='100%25' stroke-width='25%25' stroke='${encodeURIComponent(color)}'/%3E%3C/svg%3E") 1 stretch` })

        // 新增属性
        for (let v of rules) {
          decl.before({ prop: v.prop, value: v.value })
        }
        // 删除原属性
        decl.remove()
      })
    })
  }
})