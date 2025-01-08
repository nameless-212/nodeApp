/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-02 19:35:50
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-07 22:07:30
 * @FilePath: /nodeApp/middleware/exception.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const { HttpException } = require('../core/http-exception')

// 错误捕捉中间件函数
const catchError = async (ctx, next) => {
  try {
    // 继续执行下一个中间件
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      // 如果错误是已知的 HTTP 异常，返回其详细信息
      ctx.body = {
        msg: error.msg, // 错误消息
        error_code: error.errorCode, // 自定义错误代码
        request_url: `${ctx.method} ${ctx.path}` // 请求的 URL
      }
      ctx.status = error.code // 根据异常设置 HTTP 状态码
    } else {
      // 对于未知错误，返回通用消息
      ctx.body = {
        msg: '未知错误', // 错误提示
        error_code: 9999, // 通用错误代码
        request_url: `${ctx.method} ${ctx.path}` // 请求的 URL
      }
      ctx.status = 500 // 设置 HTTP 状态码为 500（内部服务器错误）
    }
  }
}

module.exports = catchError
