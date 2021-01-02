/**
 * @function generateToken
 * 生成Token令牌
 */
const jwt = require('jsonwebtoken')

// 颁发令牌
const generateToken = function (uid, scope) {
  const secretKey = global.config.security.secretKey //
  const expiresIn = global.config.security.expiresIn //过期时间
  const token = jwt.sign({
      uid,
      scope
  }, secretKey, {
      expiresIn
  })

  return token
}

module.exports = {
  generateToken
}