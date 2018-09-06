const Mock = require('mockjs')
module.exports = {
  ['GET /api/data'](req, res) {
    return res.json(Mock.mock({
      'content|2': [{
        'id|+1': 100,
        productName() {
        	return Mock.mock('@name')
        },
        'age|1-100': 6,
        email() {
        	return Mock.mock('@email')
        },
        img: 'https://www.apple.com/v/home/dt/images/heroes/iphone-x/iphone_x_small_2x.jpg',
      }]
    }))
  }
}