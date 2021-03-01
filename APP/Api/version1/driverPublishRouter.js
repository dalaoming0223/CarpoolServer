const Router = require('koa-router')

const { handleResult } = require('../../../Core/callSuccessed')
const { PublishController } = require('../../Service/publishController')

const router = new Router({
    prefix: '/v1/driverPublish'
})


router.post('/add',async (ctx, next) => {
  await PublishController.add_driverPublish(ctx, next)
  // handleResult('添加成功')
  
})

router.get('/:userid', async(ctx) => {
  await PublishController.get_driverPublish_by_user_id(ctx)
})

module.exports = router