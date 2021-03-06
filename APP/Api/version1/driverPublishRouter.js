const Router = require('koa-router')

const { handleResult } = require('../../../Core/callSuccessed')
const { driverPublishController } = require('../../Service/driverpublishController')

const router = new Router({
    prefix: '/v1/driverPublish'
})

router.post('/add',async (ctx, next) => {

  await driverPublishController.add_driverPublish(ctx, next)
  // handleResult('添加成功')
  
})
router.get('/:userid', async(ctx) => {
  await driverPublishController.get_driverPublish_by_user_id(ctx)
})

router.get('/', async(ctx) => {
  await driverPublishController.get_all_driverPublish(ctx)
})

router.get('/search/:id', async(ctx) => {
  await driverPublishController.get_driverPublish_by_id(ctx)
})

router.put('/update/:id', async(ctx) => {
  await driverPublishController.update_driverPublish(ctx)
})

router.delete('/delete/:id', async(ctx) => {
  await driverPublishController.delete_driverPublish(ctx)
})

// 往司机发布的订单里面加参与人
router.post('/addParticipator' ,async (ctx) => {
  await driverPublishController.add_driverPublish_participator(ctx)
})


module.exports = router