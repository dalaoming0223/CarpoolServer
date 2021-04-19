const Koa = require('koa')
const fs = require('fs')
const rp = require('request-promise')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')




const EntryManager = require('./Core/entryManager')
const Bodyparser = require('koa-bodyparser')
const catchError = require('./Middlewares/catchError')
const koa2cors = require('koa2-cors')

const app = new Koa()

app.use(catchError)  
app.use(Bodyparser())
app.use(koa2cors())
EntryManager.initCore(app)

app.listen(3000)