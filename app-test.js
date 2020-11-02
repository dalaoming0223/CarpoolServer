const Koa = require('koa')

const app = new Koa()

/**
 * 应用程序对象  中间件
 **/

// 注册

app.use(async (ctx, next) => {
  console.log(ctx.path)
  console.log(ctx.method)
})


// app.use(async (ctx, next) => {
//   console.log('测试KOA中间件1')
//   const a = await next()
//   console.log(a)
// })

// app.use(async (ctx, next) => {
//   console.log('测试KOA中间件2')
//   // await next()
//   return 'abcdefg'
// })


// app.use( (ctx, next) => {
//   console.log('测试KOA中间件1')
//   const a = next()
//   console.log(a)
//   a.then((res) => console.log(res))
// })

// app.use( (ctx, next) => {
//   console.log('测试KOA中间件2')
//   next()
//   return '(#`O′)！！！！！！！！！！！！！'
// })

app.listen(3000)