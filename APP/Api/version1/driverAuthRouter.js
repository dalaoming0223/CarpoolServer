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

module.exports = router




