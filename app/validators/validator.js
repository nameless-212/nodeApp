/*
 * @Author: liushuai 2668984836@qq.com
 * @Date: 2025-01-03 20:28:13
 * @LastEditors: liushuai 2668984836@qq.com
 * @LastEditTime: 2025-01-08 01:00:23
 * @FilePath: /nodeApp/app/validators/validator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { LoginType } = require('../lib/enum')
const { User } = require('../models/user')
class PositiveIntValidate extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要传入正整数', { min: 1 })]
  }
}
class RegisterValidate extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符', { min: 6, max: 32 }),
      new Rule(
        'matches',
        '密码不符合规范，请输入6-32位数字和字母',
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,32}$/
      )
    ]
    this.password2 = this.password1
    this.nikename = [
      new Rule('isLength', '昵称至少2个字符', { min: 2, max: 32 })
    ]
  }
  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: { email }
    })
    if (user) {
      throw new Error('电子邮箱已存在')
    }
  }
}
class TokenValidate extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '账号至少6个字符', { min: 6, max: 32 })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '密码至少6个字符', { min: 6, max: 32 })
    ]
  }
  validateLoginType(vals) {
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('登录类型错误')
    }
  }
}

module.exports = {
  PositiveIntValidate,
  RegisterValidate,
  TokenValidate
}
