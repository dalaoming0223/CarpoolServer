const Router = require('koa-router')

const { PositiveIntegerValidator } = require('../../Validators/testValidator')

const router = new Router()


// router.get('/v1/test', (ctx, next) => {
//   ctx.body = { key:'fuck u' }
// });

// router.post('/v1/:id/testPost', (ctx, next) => {
//   const path = ctx.params
//   const query = ctx.request.query
//   const headers = ctx.request.header
//   const body = ctx.request.body

//   if(true){
//     // 动态
//     const error = new Error('为啥错误')
//     error.errorCode = 10001
//     error.status = 400
//     error.requestUrl = `${ctx.method}  ${ctx.path}`
//     throw error
//   }

//   //上面三中自带的
//   ctx.body = { key:'fuck u' }

//   //body需要body-parser
// });

router.post('/v1/:id/testPost',async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')
  // if(true){
  //   // 动态
  //   const error = new global.errs.ParameterException()

  //   throw error
  // }

  //上面三中自带的
  ctx.body = { id }

});


module.exports = router
