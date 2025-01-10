/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-02 19:35:50
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-07 22:07:30
 * @FilePath: /nodeApp/middleware/exception.js
 * @Description: 错误处理中间件，统一捕获并处理应用中的异常
 */

const { HttpException } = require('../core/http-exception') // 引入自定义的 HTTP 异常类

// 错误捕捉中间件函数
const catchError = async (ctx, next) => {
  try {
    // 继续执行下一个中间件
    await next()
  } catch (error) {
    // 判断错误是否是已知的 HTTP 异常
    const isHttpException = error instanceof HttpException
    // 判断当前环境是否为开发环境
    const isDev = global.config.environment === 'dev'

    if (isDev && !isHttpException) {
      // 在开发环境中，如果错误不是已知的 HTTP 异常，则重新抛出错误，便于调试
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
      // 对于未知错误，返回通用错误信息
      ctx.body = {
        msg: '未知错误', // 通用错误消息
        error_code: 9999, // 通用错误代码
        request_url: `${ctx.method} ${ctx.path}` // 请求的 URL
      }
      ctx.status = 500 // 设置 HTTP 状态码为 500（内部服务器错误）
    }

    // 在生产环境中记录详细的错误日志
    if (!isDev) {
      console.error('Unhandled Error:', error) // 记录未知错误的详细信息
    }
  }
}

module.exports = catchError // 导出中间件，以便在应用中使用
