/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-02 11:06:26
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-10 13:28:07
 * @FilePath: /nodeApp/core/init.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  /**
   * 初始化核心方法，加载路由、异常处理、配置等
   * @param {Object} app - Koa 应用实例
   */
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
    InitManager.successRes()
  }

  /**
   * 加载配置文件
   * @param {string} path - 配置文件路径，默认为项目根目录下的 config/config.js
   */
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  /**
   * 初始化并加载所有路由
   */
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    /**
     * 当加载的模块是 Router 实例时，将其添加到 Koa 应用中
     * @param {Object} obj - 加载的模块对象
     */
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  /**
   * 加载自定义 HTTP 异常处理模块
   */
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }

  /**
   * 设置统一的成功响应方法
   */
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
