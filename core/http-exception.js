/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-02 23:16:14
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-08 00:50:40
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

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed
}
