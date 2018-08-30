export default function() {
  const requireComponent = require.context(
    '../mocks/',
    false,
    /\.js$/
  )
  let mockList = requireComponent.keys()
  mockList.splice(mockList.indexOf('./base.js'), 1)
  mockList.forEach(requireComponent)
}