const requireDirectory = require('require-directory')
const Router = require('koa-router')
class EntryManager {

  static initCore(app) {
    // 入口方法
    EntryManager.app = app;
    EntryManager.initLoadRouters()
    EntryManager.loadHttpException()
    EntryManager.loadConfig()
  }

  // 加载全部路由
  static initLoadRouters() {
    // 绝对路径
    const apiDirectory = `${process.cwd()}/APP/Api`
    // 路由自动加载
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    // 判断 requireDirectory 加载的模块是否为路由
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        EntryManager.app.use(obj.routes())
      }
    }
  }


  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/Config/config.js'
    const config = require(configPath)
    global.config = config
  }

  // 加载异常处理, 把所有的异常类装在到 [ global.errs ] 下
  static loadHttpException() {
    const errors = require('./httpException')
    global.errs = errors
  }
}

module.exports = EntryManager