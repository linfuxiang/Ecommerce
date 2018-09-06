const fs = require('fs')
const Mock = require('mockjs')

let mockObj = {
  ['GET /api/index'](req, res) {
    return res.json(Mock.mock({
      'content|10': [{
        'id|+1': 100,
        username: Mock.mock('@word(3, 5)'),
        'age|1-100': 6,
        email: Mock.mock('@email'),
      }]
    }))
  }
}
// 读取所有Mock数据文件，并整合到mockObj中
let files = fs.readdirSync('./src/mocks')

files.forEach(function(item) {
  if (item !== 'index.js') {
    Object.assign(mockObj, require(`./${item}`))
  }
})

module.exports = mockObj