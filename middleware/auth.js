/*
 * @Author: Wilson wilson_6836@163.com
 * @Date: 2025-01-09 23:40:54
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-12 00:51:12
 * @FilePath: /nodeApp/middleware/auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const basicAuth = require('basic-auth') // 引入 basic-auth 模块，用于解析基本认证头
const { ForbidenException } = require('../core/http-exception') // 引入自定义的 Forbidden 异常类
const jwt = require('jsonwebtoken') // 引入 JSON Web Token 模块

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req) // 从请求中提取基本认证信息
      let errMsg = 'token不合法' // 初始化错误消息为“token不合法”
      if (!userToken || !userToken.name) {
        // 如果未提供 token 或 token名称不存在
        throw new ForbidenException(errMsg) // 抛出禁止访问异常
      }
      try {
        var decode = jwt.verify(
          // 尝试验证并解码 token
          userToken.name, // 使用 token 的名称部分
          global.config.security.secretKey // 使用全局配置中的密钥
        )
      } catch (error) {
        // 捕获 token 验证过程中的错误
        if (error.name === 'TokenExpiredError') {
          // 如果错误类型是 token 过期
          errMsg = '授权过期' // 更新错误消息为“授权过期”
          throw new ForbidenException(errMsg) // 抛出禁止访问异常
        }
        throw new ForbidenException(errMsg) // 对于其他错误，抛出原始的禁止访问异常
      }

      errMsg = '权限不足' // 更新错误消息为“权限不足”
      // 如果解码后的 scope 小于当前实例的 level，抛出禁止访问异常
      if (decode.scope < this.level) {
        throw new ForbidenException(errMsg)
      }

      const { uid, scope } = decode // 从解码后的 token 中提取 uid 和 scope
      ctx.auth = { uid, scope } // 将 uid 和 scope 赋值给上下文的 auth 属性
      await next() // 调用下一个中间件
    }
  }
}

module.exports = {
  Auth
}
