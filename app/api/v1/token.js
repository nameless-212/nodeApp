/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-08 00:09:35
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-08 01:13:03
 * @FilePath: /nodeApp/app/api/v1/token.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { ParameterException } = require('../../../core/http-exception')
const { TokenValidate } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async (ctx) => {
  const v = await new TokenValidate().validate(ctx)
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    default:
      throw new ParameterException('没有找到登录类型')
  }
  ctx.body = ctx.successRes('token')
})
const emailLogin = async (account, secret) => {
  const user = await User.verifyEmailPassword(account, secret)
}
module.exports = router
