const Router = require('koa-router')

const { handleResult } = require('../../../Core/callSuccessed')
const router = new Router({
    prefix: '/v1/driverPublish'
})


router.post('/add',async (ctx) => {
  console.log(ctx.request.body)
  tt = '收到了'
  handleResult('司机msg添加成功')
})


module.exports = router