/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-02 23:16:14
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-12 00:00:22
 * @FilePath: /nodeApp/core/http-exception.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class HttpException extends Error {
  constructor(msg = '参数错误', errorCode = 10000, code = 400) {
    super()
    this.code = code
    this.msg = msg
    this.errorCode = errorCode
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
    this.code = 400
  }
}
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '资源未找到'
    this.errorCode = errorCode || 10000
    this.code = 404
  }
}
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10004
    this.code = 401
  }
}

class ForbidenException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10006
    this.code = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  ForbidenException
}
