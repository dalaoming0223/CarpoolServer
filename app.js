const Koa = require('koa')

const EntryManager = require('./Core/entryManager')
const parser = require('koa-bodyparser')
const catchError = require('./Middlewares/catchError')

const app = new Koa()

app.use(catchError)
app.use(parser())
EntryManager.initCore(app)

app.listen(3000)