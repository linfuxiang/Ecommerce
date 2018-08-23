const postcss = require('postcss')

module.exports = postcss.plugin('postcss-group', function(opts) {
  opts = opts || {}
  opts.keepPxComment = opts.keepPxComment || 'no'
  // 传入配置相关的代码
  return function(root, result) {
    // 遍历rules
    let list = []
    root.walkRules(function(rule) {
      rule.walkDecls(/^border\-radius$/, function(decl) {
        if (decl.next() && decl.next().type === 'comment') {
          return false
        }
        //   rule.insertAfter(decl, { text: opts.keepPxComment })
        //   // return false
        // 记录是否存在after和before
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
        let selector = rule.selector
        let border
        // 增加border: 1px不转译注释
        rule.walkDecls(/^border$/, function(decl) {
          if (decl.next() && decl.next().type !== 'comment') {
            rule.insertAfter(decl, postcss.comment({ text: opts.keepPxComment }))
          }
          border = decl.value
        })
        let bg = 'red'
        rule.walkDecls(/background/, function(decl) {
          bg = decl.value
        })
        rule.prepend({ prop: 'position', value: 'relative' })
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
      })
    })
    for (var v of list) {
      root.append(v)
    }
  }
})