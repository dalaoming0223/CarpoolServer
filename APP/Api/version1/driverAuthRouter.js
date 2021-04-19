const Router = require('koa-router')

const { driverAuthController } = require('../../Service/driverAuthController')
const router = new Router({
  prefix: '/v1/driverAuth'
})


router.post('/add', async (ctx)=>{
  await driverAuthController.add_driver(ctx)
})

router.get('/finddriver/:userid', async(ctx) => {
  await driverAuthController.get_driver(ctx)
})

router.get('/getalluser', async(ctx) => {
  await driverAuthController.get_all_driver(ctx)
})

router.post('/updateimg', async(ctx) => {
  console.log('访问这个！')
  await driverAuthController.update_img_http_location(ctx)
})


module.exports = router




