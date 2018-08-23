const postcss = require('postcss')

module.exports = postcss.plugin('postcss-group', function(opts) {
  opts = opts || {}
  opts.keepPxComment = opts.keepPxComment || 'no'
  // 传入配置相关的代码
  return function(root, result) {
    let list = []	// 用于记录需要添加的规则
    // 遍历root
    root.walkRules(function(rule) {
      rule.walkDecls(/^border\-radius$/, function(decl) {
        // 如果下一句为注释则不转译
        let next = decl.next()
        if (
          next &&
          next.type === 'comment' &&
          next.text === opts.keepPxComment
        ) {
          return false
        }

        // 检查是否存在after和before
        let hasAfter = false,
          hasBefore = false
        rule.parent.walkRules(new RegExp(`${rule.selector}::?after`), function(decl) {
          hasAfter = true
        })
        rule.parent.walkRules(new RegExp(`${rule.selector}::?before`), function(decl) {
          hasBefore = true
        })
        if (hasAfter && hasBefore) {
          return false
        }

        // 记录该条规则的选择器
        let selector = rule.selector

        // 对border: 1px属性增加/* no */的不转译注释，并记录可能存在的border属性
        let border = 'none'
        rule.walkDecls(/^border(\-(top|left|bottom|right))*$/, function(decl) {
          if (decl.next() && decl.next().type !== 'comment') {
            rule.insertAfter(decl, postcss.comment({ text: opts.keepPxComment }))
          }
          border = decl.value
        })

        // 记录背景颜色
        let bg = 'transparent'
        rule.walkDecls(/background/, function(decl) {
          bg = decl.value
        })

        // 创建媒体查询对border-radius进行处理
        let media2x = postcss.rule({
          selector: '@media screen and (-webkit-min-device-pixel-ratio: 2)'
        })
        let media3x = postcss.rule({
          selector: '@media screen and (-webkit-min-device-pixel-ratio: 3)'
        })
        let btn = postcss.rule({
          selector: selector
        })
        btn.append({ prop: 'background', value: 'transparent' })
        btn.append({ prop: 'border', value: 'none' })
        btn.append({ text: 'no' })
        btn.append({ prop: 'border-radius', value: '0' })
        let btnAfter2x = postcss.rule({
          selector: selector + (!hasAfter ? '::after' : '::before')
        })
        btnAfter2x.append({ prop: 'background', value: bg })
        btnAfter2x.append({ prop: 'border', value: border })
        btnAfter2x.append({ text: opts.keepPxComment })
        btnAfter2x.append({ prop: 'border-radius', value: decl.value })
        btnAfter2x.append({ text: opts.keepPxComment })
        btnAfter2x.append({ prop: 'content', value: '\'\'' })
        btnAfter2x.append({ prop: 'display', value: 'block' })
        btnAfter2x.append({ prop: 'height', value: '200%' })
        btnAfter2x.append({ prop: 'width', value: '200%' })
        btnAfter2x.append({ prop: 'position', value: 'absolute' })
        btnAfter2x.append({ prop: 'top', value: '0' })
        btnAfter2x.append({ prop: 'left', value: '0' })
        btnAfter2x.append({ prop: 'transform', value: 'scale(.5)' })
        btnAfter2x.append({ prop: 'transform-origin', value: '0 0' })
        btnAfter2x.append({ prop: 'z-index', value: '-1' })
        let btnAfter3x = postcss.rule({
          selector: selector + (!hasAfter ? '::after' : '::before')
        })
        btnAfter3x.append({ prop: 'border-radius', value: decl.value })
        btnAfter3x.append({ text: opts.keepPxComment })
        btnAfter3x.append({ prop: 'height', value: '300%' })
        btnAfter3x.append({ prop: 'width', value: '300%' })
        btnAfter3x.append({ prop: 'transform', value: 'scale(.3333)' })

        media2x.append(btn, btnAfter2x)
        media3x.append(btnAfter3x)

        list.push(media2x)
        list.push(media3x)

        // 为使after元素可以根据父元素绝对定位，需为父元素加上relative并删除可能存在的static
        rule.prepend({ prop: 'position', value: 'relative' })
        rule.walkDecls(/position/, function(decl) {
          if(decl.value === 'static') {
          	decl.remove
          }
        })
      })
    })
    for (var v of list) {
      root.append(v)
    }
  }
})