/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-03 20:40:18
 * @LastEditors: Wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-09 22:55:55
 * @FilePath: /nodeApp/core/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken')
/**
 * 查找实例中符合条件的成员
 * @param {Object} instance - 要查找的实例对象
 * @param {Object} options - 查找条件选项
 * @param {string} options.prefix - 成员名称前缀
 * @param {Function} options.specifiedType - 成员类型过滤函数
 * @param {Function} options.filter - 自定义过滤函数
 * @returns {Array} 符合条件的成员名称数组
 */
const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归查找函数
  function _find(instance) {
    // 基线条件：如果实例的原型为null，则停止递归
    if (instance.__proto__ === null) return []

    // 获取实例的所有自身属性名称
    let names = Reflect.ownKeys(instance)
    // 过滤掉不满足条件的属性或方法名
    names = names.filter((name) => {
      return _shouldKeep(name)
    })

    // 递归查找实例的原型链，并合并结果
    return [...names, ..._find(instance.__proto__)]
  }

  /**
   * 判断成员名称是否应该被保留
   * @param {string} value - 成员名称
   * @returns {boolean} 是否保留
   */
  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix) if (value.startsWith(prefix)) return true
    if (specifiedType) if (instance[value] instanceof specifiedType) return true
    return false
  }

  return _find(instance) // 返回符合条件的成员名称数组
}

/**
 * 生成JWT令牌
 * @param {string|number} uid - 用户ID
 * @param {number} scope - 权限级别
 * @returns {string} 生成的JWT令牌
 */
const generateToken = function (uid, scope) {
  const { secretKey, expiresIn } = global.config.security // 获取全局配置中的密钥和过期时间
  // 使用jsonwebtoken库生成签名的JWT
  const token = jwt.sign(
    {
      uid, // 用户ID
      scope // 权限级别
    },
    secretKey, // 签名密钥
    {
      expiresIn // 过期时间设置
    }
  )
  return token // 返回生成的JWT令牌
}

module.exports = {
  findMembers,
  generateToken
}
