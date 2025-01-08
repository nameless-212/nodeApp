/*
 * @Author: wilson wilson_6836@163.com
 * @Date: 2025-01-03 20:40:18
 * @LastEditors: wilson wilson_6836@163.com
 * @LastEditTime: 2025-01-08 19:50:54
 * @FilePath: /nodeApp/core/util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const jwt = require('jsonwebtoken')
/***
 *
 */
const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null) return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix) if (value.startsWith(prefix)) return true
    if (specifiedType) if (instance[value] instanceof specifiedType) return true
  }

  return _find(instance)
}

const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey
  const expiresIn = global.config.security.expiresIn
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    {
      expiresIn
    }
  )
  return token
}

module.exports = {
  findMembers,
  generateToken
}
