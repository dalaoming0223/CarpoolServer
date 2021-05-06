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
  console.log('获取最近日程')
  await driverPublishController.get_recently_driverPublish_by_participator(ctx)
})


router.put('/updateParticipator', async(ctx) => {
  // console.log('执行更新路由')
  await driverPublishController.update_driverPublish_participator_join_status(ctx)
})


// 评分
router.put('/grade/part/:participatorid', async(ctx) => {
  console.log('执行评分')
  await driverPublishController.grade_by_participator(ctx)
})

// 根据participatorid查询数据
router.get('/search/participator/:participator_id', async(ctx) => {
  // console.log('执行查询')
  await driverPublishController.get_by_participator_id(ctx)
})

router.get('/search/driverpublish', async(ctx)=> {
  // console.log('模糊搜索')
  await driverPublishController.search_driver_publish(ctx)
})


module.exports = router