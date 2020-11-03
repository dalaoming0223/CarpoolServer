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
      ]
  }
}


module.exports = {
  PositiveIntegerValidator
}