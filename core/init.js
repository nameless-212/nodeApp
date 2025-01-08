/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-02 11:06:26
 * @LastEditors: wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-07 23:45:49
 * @FilePath: /nodeApp/core/init.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
    InitManager.successRes()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }

  static successRes() {
    InitManager.app.context.successRes = (data, msg) => {
      return {
        data,
        msg,
        code: 200
      }
    }
  }
}

module.exports = InitManager
