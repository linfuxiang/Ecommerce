import Mock from 'mockjs'

Mock.mock('/api/test', function(args = { type: 1 }) {
  if (args.type == 1) {
    return {
      data: 333
    }
  } else {
    return {
      data: 444
    }
  }
})