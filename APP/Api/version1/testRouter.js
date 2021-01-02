const Router = require('koa-router')


const { PositiveIntegerValidator } = require('../../Validators/testValidator')
const { Auth } = require('../../../Middlewares/auth')
const { User } = require('../../Models/userModel')
const router = new Router()



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

// 测试专用JWT(Token)保护API
router.get('/v1/latest', new Auth().tokenVerify, async(ctx, next) => {
  //权限分级
  ctx.body = {
    uid:ctx.auth.uid,
    scope: ctx.auth.scope
  }
})

// 测试专用接口
router.get('/v1/getalluser', new Auth().tokenVerify, async(ctx, next) => {
  const AllUser = await User.getAllUser()
  ctx.body = {
    alluser: AllUser
  }
})


module.exports = router












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