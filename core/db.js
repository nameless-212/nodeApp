/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-06 01:21:47
 * @LastEditors: wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-08 01:15:02
 * @FilePath: /nodeApp/core/db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8配
 */

const Sequelize = require('sequelize') // 引入 Sequelize 库
const { dbName, host, port, user, password } =
  require('../config/config').database // 从配置文件中获取数据库连接参数

// 创建 Sequelize 实例并配置数据库连接
const sequelize = new Sequelize(dbName, user, password, {
  host, // 数据库主机地址
  dialect: 'mysql', // 使用的数据库类型
  port, // 数据库端口号
  logging: true, // 是否显示 SQL 日志
  timezone: '+08:00', // 设置时区为东八区
  define: {
    timestamps: true, // 自动添加时间戳字段(createdAt, updatedAt)
    paranoid: true, // 启用软删除（deletedAt字段）
    createdAt: 'created_at', // 自定义创建时间字段名
    updatedAt: 'updated_at', // 自定义更新时间字段名
    deletedAt: 'deleted_at', // 自定义删除时间字段名
    underscored: true // 使用下划线命名风格（例如：created_at）
  }
})

// 同步模型到数据库
sequelize.sync({
  force: false // 如果为true，将强制重新创建表（慎用，生产环境请设为false）
})

// 导出 sequelize 实例以供其他模块使用
module.exports = {
  sequelize
}
