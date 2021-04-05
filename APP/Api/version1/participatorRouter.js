const Router = require('koa-router')

const { handleResult } = require('../../../Core/callSuccessed')
const { driverPublishController } = require('../../Service/driverpublishController')

const router = new Router({
    prefix: '/v1/participator'
})

router.get('/searchParticipator',async (ctx) => {
  await driverPublishController.search_driverPublish_participator(ctx)
})


router.get('/search/user/:userid',async (ctx) => {
  await driverPublishController.get_driverPublish_by_participator(ctx)
})

router.get('/searchrecent/user/:userid',async (ctx) => {
  await driverPublishController.get_recently_driverPublish_by_participator(ctx)
})

router.put('/updateParticipator', async(ctx) => {
  // console.log('执行更新路由')
  driverPublishController.update_driverPublish_participator_join_status(ctx)
})


// 评分
router.post('/grade/part/:participatorid', async(ctx) => {
  // console.log('执行更新路由')
  driverPublishController.grade_by_participator(ctx)
})

router.get('/search/driverpublish', async (ctx)=> {
  // console.log('模糊搜索')
  await driverPublishController.search_driver_publish(ctx)
})


module.exports = router