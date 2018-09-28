module.exports = (api, options) => {
  api.registerCommand('testplugin', (args, rawArgv) => {
    console.log('===============\n')
    console.log('这是个自定义插件，只执行serve')
    console.log('===============\n')
    api.service.commands.serve.fn(args, rawArgv).then(res => {
      console.log('finish')
    })
  })
}
