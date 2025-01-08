/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-06 01:21:47
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-08 01:15:02
 * @FilePath: /nodeApp/core/db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

module.exports = {
  sequelize
}
 */
const Sequelize = require('sequelize')
const { dbName, host, port, user, password } =
  require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})
sequelize.sync({
  force: false
})
module.exports = {
  sequelize
}
