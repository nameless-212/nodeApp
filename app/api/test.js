/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2024-12-28 00:15:55
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-12 00:50:36
 * @FilePath: /nodeApp/api/v1/book.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../core/http-exception')
const { PositiveIntValidate } = require('../validators/validator')
const { Auth } = require('../../middleware/auth')
const router = new Router({
  prefix: '/test'
})
router.get('/node1', new Auth(8).m, async (ctx) => {
  const { uid, scope } = ctx.auth
  ctx.body = ctx.successRes({ uid, scope }, '授权成功')
})

router.get('/detail/:id', async (ctx) => {
  const path = ctx.params
  const { token } = ctx.request.header
  const v = await new PositiveIntValidate().validate(ctx)
  ctx.body = {
    mas: '1111',
    data: {
      ...path,
      token
    }
  }
})

module.exports = router
