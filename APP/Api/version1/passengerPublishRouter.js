const Router = require('koa-router')

const { passengerPublishController } = require('../../Service/passengerPublishController')

const router = new Router({
    prefix: '/v1/passengerPublish'
})

router.post('/add', async(ctx, next) => {
  console.log('执行passenger_publish添加')
  await passengerPublishController.add_passengerPublish(ctx, next)
})


router.get('/:userid', async(ctx) => {
  await passengerPublishController.get_passengerPublish_by_user_id(ctx)
})


router.get('/', async(ctx) => {
  await passengerPublishController.get_all_passengerPublish(ctx)
})

module.exports = router