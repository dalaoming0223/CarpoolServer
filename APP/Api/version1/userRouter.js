const Router = require('koa-router')
const { RegisterValidator } = require('../../Validators/userValidator')
const { User } = require('../../Models/db')
const { handleResult } = require('../../../Core/callSuccessed')
const { userController } = require('../../Service/userController')
const router = new Router({
  prefix: '/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {
  const userParams = await new RegisterValidator().validate(ctx)
  const user = {
    email: userParams.get('body.email'),
    password: userParams.get('body.password2'),
    nickname: userParams.get('body.nickname')
  }
  await User.create(user)
  handleResult('注册成功')
})


router.get('/getcontactpeople/:user_id', async(ctx) => {
  await userController.search_contact_people(ctx)
})

router.post('/addcontactpeople', async(ctx) => {
  await userController.add_contact_people(ctx)
})

router.post('/updatecontactpeople', async(ctx) => {
  await userController.update_contact_people(ctx)
})

router.delete('/deletecontactpeople', async(ctx) => {
  await userController.delete_contact_people(ctx)
})

// 新版手机登陆
router.post('/login2', async(ctx) => {
  await userController.login2(ctx)
})

module.exports = router