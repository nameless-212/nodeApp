/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2024-12-28 00:16:08
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-07 23:57:05
 * @FilePath: /nodeApp/api/v1/classic.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Router = require('koa-router')
const { RegisterValidate } = require('../../validators/validator')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})
// 用户注册的路由处理函数
router.post('/register', async (ctx) => {
  // 使用 RegisterValidate 验证请求数据
  const v = await new RegisterValidate().validate(ctx)

  // 使用验证后的数据创建用户
  const result = await User.create({
    email: v.get('body.email'), // 用户的邮箱
    password: v.get('body.password2'), // 用户确认后的密码
    nikename: v.get('body.nikename') // 用户的昵称
  })

  // 发送注册成功的响应
  ctx.body = ctx.successRes(result, '注册成功')
})

module.exports = router
