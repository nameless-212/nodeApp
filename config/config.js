/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-04 00:31:24
 * @LastEditors: wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-08 23:18:54
 * @FilePath: /nodeApp/config/config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  environment: 'dev',
  database: {
    dbName: 'web_tab',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '666888'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 30
  }
}
