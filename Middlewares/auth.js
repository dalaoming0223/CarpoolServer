const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    //类变量的定义不是 this.*** 而是类名
    Auth.NORMAL_USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  // token 检测
  // token 开发者 传递令牌
  // token 通过 body 或者 header传递
  // HTTP 天然规定 身份验证机制 HttpBasicAuth
  get tokenVerify() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      // userToken返回格式
      //Credentials {
      //      name: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsInNjb3BlIjo4LCJpYXQiOjE2MDQ5NzkxOTAsImV4cCI6MTYwNzU3MTE5MH0.HSi9QU7Ka66P8jGfaZ0I828LJHt_Lp1xP6BJ0PgiCVQ',
     //       pass: ''
    //}

      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden("token不存在")
      }
      let errMsg

      // 解码token
      try {

        var decode = jwt.verify(userToken.name, global.config.security.secretKey)

      } catch (error) {
        // token 不合法 过期
        if (error.name === 'TokenExpiredError') {
          errMsg = "token已过期"
        }
        throw new global.errs.Forbidden(errMsg)
      }

      // 权限不足
      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }


  // 验证token是否有效
  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)

      return true;
    } catch (e) {
      return false
    }
  }
}


module.exports = {
  Auth
}