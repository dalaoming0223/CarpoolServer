const Router = require('koa-router')
const { TokenValidator, TokenNotEmptyValidator} = require('../../Validators/tokenValidator')
// const { User } = require('../../Models/userModel')
const { User } = require('../../Models/db')
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
  const account = tokenParams.get('body.account') //  账号密码用户账号(目前以邮箱作为用户账号)
  const secret = tokenParams.get('body.secret')   //  账号密码用户登录密码
  const code = tokenParams.get('body.code')   //  微信用户登录code
  const avatar_url = tokenParams.get('body.avatar_url')
  const nick_name = tokenParams.get('body.nick_name')

  const user_info = {
    avatar_url,
    nick_name
  }

  // console.log(user_info)
  // console.log('能走到这里吗')
  let token 

  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, secret)
      break;
    
    case LoginType.USER_MINI_PROGRAM:
      // code
      // console.log('打印从wechat端传过来的code：',code)
      // token,openid = await WeChatController.codeToToken(code)
      arr = await WeChatController.codeToToken(code,user_info)
      // console.log(arr)
      break;
    
    case LoginType.ADMIN_EMAIL:
      break;

    default:
      throw new global.errs.ParameterException('该type码所对应的登录方式没有相应的处理函数')
      break;
  }

  ctx.body = {
    token: arr[0],
    openid: arr[1],
    userid: arr[2]
  }
})

//  废弃
router.post('/verify', async(ctx)=> {
  // token 验证
  const params = await new TokenNotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(params.get('body.token'))
  ctx.body = {
    result
  }
})

async function emailLogin(account, secret){
  const user = await User.checkEmailPassword(account, secret) 
  // 颁布令牌
  return generateToken(user.id, Auth.NORMAL_USER)
}

module.exports = router