const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
  import ('../utils/requireContext.js')
  .then(mod => {
    mod.default()
  })
}