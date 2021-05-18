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

router.put('/update/:id', async(ctx) => {
  driverAuthController.update_driver(ctx)
})

router.get('/getalluser', async(ctx) => {
  await driverAuthController.get_all_driver(ctx)
})

router.post('/updateimg', async(ctx) => {
  console.log('获取img https链接')
  await driverAuthController.update_img_http_location(ctx)
})

// 管理相关
router.post('/changestatus/:driver_id', async(ctx)=> {
  console.log('改变司机status')
  await driverAuthController.change_driver_status(ctx)
})


module.exports = router




