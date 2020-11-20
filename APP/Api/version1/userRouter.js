const Router = require('koa-router')
const { RegisterValidator } = require('../../Validators/userValidator')
const { User } = require('../../Models/userModel')
const { handleResult } = require('../../../Core/callSuccessed')
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


module.exports = router