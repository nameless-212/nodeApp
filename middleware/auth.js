/*
 * @Author: Wilson wilson_6836@163.com
 * @Date: 2025-01-09 23:40:54
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-09 23:48:12
 * @FilePath: /nodeApp/middleware/auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const basicAuth = require('basic-auth')
class Auth {
  constructor() {}

  get m() {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      ctx.body = ctx.successRes(token, '授权成功')
    }
  }
}

module.exports = {
  Auth
}
