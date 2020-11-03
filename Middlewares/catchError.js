const {
  HttpException
} = require('../Core/httpException')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {

    const isHttpException = error instanceof HttpException //是否是已知异常
    if (isHttpException) {
      
      //已知异常
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      
      //未知异常
      ctx.body = {
        msg: "未知错误！",
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }

  }
}

module.exports = catchError