const Router = require('koa-router')

const { driverPublishController } = require('../../Service/driverpublishController')
const { userController } = require('../../Service/userController')
const { bbsController } = require('../../Service/bbsController')
const { adminController } = require('../../Service/adminController')

const router = new Router({
  prefix: '/v1/admin'
})


router.get('/get_panelGroup', async(ctx) => {
  await adminController.get_panelGroup(ctx)
})

router.post('/add_admin', async(ctx) => {
  await adminController.add_admin(ctx)
})

router.post('/login', async(ctx) => {
  await adminController.login_admin(ctx)
})
module.exports = router
