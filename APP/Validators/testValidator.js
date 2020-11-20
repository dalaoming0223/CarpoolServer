/**
 * PositiveIntegerValidator 整数校验器
 * 
 */

const {
  Rule,
  LinValidator
} = require('../../Core/linValidator')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super()
      this.id = [
          new Rule('isInt', '需要正整数', {min: 1})
          //第一个参数是一个函数  取自于validator.js 中所定义的
        
      ]
  }
}


module.exports = {
  PositiveIntegerValidator
}