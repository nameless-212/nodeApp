/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-04 00:31:24
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-09 23:00:00
 * @FilePath: /nodeApp/config/config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 当前环境设置
  environment: 'dev',

  // 数据库配置
  database: {
    dbName: 'web_tab', // 数据库名称
    host: 'localhost', // 数据库主机地址
    port: 3306, // 数据库端口
    user: 'root', // 数据库用户名
    password: '666888' // 数据库密码
  },

  // 安全配置
  security: {
    secretKey: 'abcdefg', // 用于加密的密钥
    expiresIn: 60 * 60 // 会话过期时间（秒）
  }
}
