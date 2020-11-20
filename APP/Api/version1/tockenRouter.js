const Router = require('koa-router')
const { TokenValidator } = require('../../Validators/tokenValidator')
const { User } = require('../../Models/userModel')
const { LoginType } = require('../../../Config/constant')
const { Auth } = require('../../../Middlewares/auth')
const { generateToken } = require('../../../Core/generateToken')
const { WeChatController } = require('../../Service/wechatController')

const router = new Router({
  prefix: '/v1/token'
})


// 此路由用于生成token
router.post('/', async (ctx, next) => {
  const tokenParams = await new TokenValidator().validate(ctx)
  // handleResult('TOKEN 生成成功')
  const type = tokenParams.get('body.type')
  const account = tokenParams.get('body.account') //  用户账号(目前以邮箱作为用户账号)
  const secret = tokenParams.get('body.secret')   //  用户登录密码
  const code = tokenParams.get('body.code')   //  用户登录密码
  // console.log('能走到这里吗')
  let token 

  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, secret)
      break;
    
    case LoginType.USER_MINI_PROGRAM:
      // code
      console.log('打印从wechat端传过来的code：',code)
      token = await WeChatController.codeToToken(code)
      break;
    
    case LoginType.ADMIN_EMAIL:
      break;

    default:
      throw new global.errs.ParameterException('该type码所对应的登录方式没有相应的处理函数')
      break;
  }

  ctx.body = {
    token
  }
})

async function emailLogin(account, secret){
  const user = await User.checkEmailPassword(account, secret) 
  // 颁布令牌
  return generateToken(user.id, Auth.NORMAL_USER)
}

module.exports = router