/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-08 00:09:35
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-12 00:36:49
 * @FilePath: /nodeApp/app/api/v1/token.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const Router = require('koa-router') // 引入 Koa 路由模块
const { generateToken } = require('../../../core/util') // 引入生成 Token 的工具函数
const { LoginType } = require('../../lib/enum') // 引入登录类型枚举
const { ParameterException } = require('../../../core/http-exception') // 引入参数异常类
const { TokenValidate } = require('../../validators/validator') // 引入 Token 验证器
const { User } = require('../../models/user') // 引入用户模型
const { Auth } = require('../../../middleware/auth')

// 初始化路由，设置前缀为 /v1/token
const router = new Router({
  prefix: '/v1/token'
})

// 定义 POST 请求处理函数
router.post('/', async (ctx) => {
  // 进行请求参数的验证
  const v = await new TokenValidate().validate(ctx)
  let token = '' // 初始化 token 变量

  // 根据不同的登录类型处理
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      // 如果是邮箱登录，调用 emailLogin 函数
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      // 未来支持小程序登录的逻辑
      break
    default:
      // 如果登录类型未定义，抛出参数异常
      throw new ParameterException('没有找到登录类型')
  }

  // 返回成功的响应，包含生成的 token
  ctx.body = ctx.successRes({ token }, '登录成功')
})

/**
 * 通过邮箱和密码进行登录，并生成 Token
 * @param {string} account - 用户邮箱
 * @param {string} secret - 用户密码
 * @returns {string} - 生成的 Token
 */
const emailLogin = async (account, secret) => {
  // 验证邮箱和密码是否匹配
  const user = await User.verifyEmailPassword(account, secret)
  console.log(user) // 打印用户信息（可用于调试）

  // 生成 Token，第二个参数可能代表 Token 的有效期或类型
  return await generateToken(user.id, Auth.USER)
}

// 导出路由模块
module.exports = router
