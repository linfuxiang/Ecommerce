var postcss = require('postcss');

function hasComment(rule, nextRule, keepPxComment) {
  if (rule &&
    typeof rule === 'object' &&
    rule.type === 'decl' &&
    /^border(\-(top|left|bottom|right))*$/.test(rule.prop) &&
    /^.+ .+ .+$/.test(rule.value) &&
    nextRule &&
    typeof nextRule === 'object' &&
    nextRule.type === 'comment' &&
    nextRule.text.trim() === keepPxComment
  ) {
    return true;
  }
  return false;
}
module.exports = postcss.plugin('postcss-border1px', function(opts) {
  opts = opts || {};
  opts.keepPxComment = opts.keepPxComment || 'no';
  // 传入配置相关的代码
  return function(css, result) {
    // 遍历rules
    css.walkRules(function(rule) {
      let res = [];
      // console.log(rule.nodes)
      // 寻找border[-top|left|bottom|right]属性
      rule.nodes.forEach(function(decl, idx, _this) {
        // 只识别border[-top|-right|-bottom|-left]: 1px solid [color];
        if (!/^border(\-(top|left|bottom|right))*$/.test(decl.prop)) {
          return;
        }
        if (!/^.+ .+ .+$/.test(decl.value)) {
          return;
        }
        // 如果带有注释/*no*/，则忽略
        if (hasComment(rule.nodes[idx], rule.nodes[idx + 1], opts.keepPxComment)) {
          return;
        }

        let rules = [];
        // 新增以下三个属性：
        // 1. border: 0;
        rules.push({ prop: 'border', value: '0' });

        // 2. border[-top...]: 1px solid;
        let attrs = decl.prop.match(/(top|left|bottom|right)/g);
        if (attrs) {
          for (let i = 0; i < attrs.length; i++) {
            rules.push({ prop: 'border-' + attrs[i], value: '1px solid' });
          }
        } else {
          rules.push({ prop: 'border', value: '1px solid' });
        }

        // 3. border-image: svg(1px-border param(--color ${color})) 1 stretch;
        let color;
        decl.value.split(' ').forEach(function(it) {
          if (!/\dpx/.test(it) && !/(solid)|(dashed)|(dotted)/.test(it)) {
            color = it;
          }
        });
        color = color || '#e4e6e7';
        rules.push({ prop: 'border-image', value: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4px' height='4px'%3E%3Crect fill='transparent' width='100%25' height='100%25' stroke-width='25%25' stroke='${encodeURIComponent(color)}'/%3E%3C/svg%3E") 1 stretch` });

        // push到结果数组
        res.push({
          rules,
          declWillDelete: decl
        });
      });

      // 添加新属性并删除旧属性
      res.forEach(function(it) {
        for (let i = 0; i < it.rules.length; i++) {
          it.declWillDelete.before({ prop: it.rules[i].prop, value: it.rules[i].value });
        }
        it.declWillDelete.remove();
      });
    });
    // 转化CSS 的功能代码
  };
});
// rule.walkDecls(/^border(\-(top|left|bottom|right))?$/, function(decl) {
//     if (!/^.+ .+ .+$/.test(decl.value)) {
//         return;
//     }
//     // 新增属性：
//     // border: 0;
//     rules.push({ prop: 'border', value: '0' });

//     // border[-top...]: 1px solid;
//     let arr = decl.prop.split('-');
//     rules.push({ prop: 'border' + (arr[1] ? '-' + arr[1] : ''), value: '1px solid' });

//     // border-image: svg(1px-border param(--color ${color})) 1 stretch;
//     let color;
//     decl.value.split(' ').forEach(function(it) {
//         if (!/\dpx/.test(it) && !/(solid)|(dashed)|(dotted)/.test(it)) {
//             color = it;
//         }
//     });
//     color = color || '#e4e6e7';
//     rules.push({ prop: 'border-image', value: `svg(1px-border param(--color ${color})) 1 stretch` });
//     // console.log(decl)
//     rule.nodes.forEach(function(it) {
//         console.log(it.type, it.text)
//     })
//     decl.remove(); // 删除该条属性
// });