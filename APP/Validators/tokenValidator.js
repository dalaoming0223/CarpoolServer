/**
 * @class TokenValidator token令牌参数校验守门员
 */

const { Rule, LinValidator } = require('../../Core/linValidator')

const { LoginType } = require('../../Config/constant')
const { min } = require('lodash')

class TokenValidator extends LinValidator {
  constructor() {
    super()
    //生成Token所做的校验规则
    this.account = [
      new Rule('isOptional'), // LINvalidator 内置  可以设定是否为空
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]

    this.secret = [
      //1、可以为空 可以不传  2、空 不为空
      new Rule('isOptional'), // LINvalidator 内置
      new Rule('isLength', '最少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数')
    }

    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不在定义的参数范围内')
    }
  }

}


class TokenNotEmptyValidator extends LinValidator {
  constructor(){
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {
        min:1
      })
    ]
  }
}

module.exports = {
  TokenValidator,
  TokenNotEmptyValidator
}