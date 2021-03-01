const Koa = require('koa')

const EntryManager = require('./Core/entryManager')
const Bodyparser = require('koa-bodyparser')
const catchError = require('./Middlewares/catchError')


const app = new Koa()

app.use(catchError)
app.use(Bodyparser())
// app.use(async ctx => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   ctx.body = ctx.request.body;
// });
EntryManager.initCore(app)

app.listen(3000)