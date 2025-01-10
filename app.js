/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2024-12-27 23:43:59
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-10 11:21:49
 * @FilePath: /nodeApp/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser') // 获取body参数的中间件
const catchError = require('./middleware/exception') // 错误处理中间件

const app = new Koa()

// 注册错误处理中间件，应该放在所有中间件的最前面
app.use(catchError)

// 注册解析请求体的中间件
app.use(parser())

// 初始化应用核心，例如路由等
InitManager.initCore(app)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
