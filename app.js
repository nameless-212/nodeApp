/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2024-12-27 23:43:59
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-07 23:54:35
 * @FilePath: /nodeApp/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser') // 获取body参数的中间件
const catchError = require('./middleware/exception') // 获取body参数的中间件

const app = new Koa()
app.use(catchError) // 错误处理中间件
app.use(parser())

// 包装初始化过程
// try {
InitManager.initCore(app)
// } catch (error) {
//   console.error('Initialization error:', error)
//   process.exit(1)
// }

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
