/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2024-12-28 00:15:55
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-07 23:02:54
 * @FilePath: /nodeApp/api/v1/book.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Router = require('koa-router')
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')
const { PositiveIntValidate } = require('../../validators/validator')
const router = new Router()
router.get('/v1/book/latest', async (ctx) => {
  ctx.body = {
    msg: 'Hello book'
  }
})

router.get('/v1/book/detail/:id', async (ctx) => {
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
