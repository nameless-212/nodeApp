/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2024-12-28 00:16:08
 * @LastEditors: wilson wilson_6836@163.com
 * @LastEditTime: 2024-12-28 01:25:04
 * @FilePath: /nodeApp/api/v1/classic.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Router = require('koa-router')
const router = new Router()
router.get('/classic/latest', async (ctx) => {
  ctx.body = {
    msg: 'Hello classic'
  }
})

module.exports = router
