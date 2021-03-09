const util = require('util')
const axios = require('axios')

const { User } = require('../Models/db')
const { generateToken } = require('../../Core/generateToken')
const { Auth } = require('../../Middlewares/auth')
/**
 * @class WeChatController 处理微信的业务逻辑
 */

class WeChatController {

  static async codeToToken(code) {

    // 格式化url  替换掉 %s 
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)
    // console.log(url)
    
    const result = await axios.get(url)

    if (result.status !== 200) {
      throw new global.errs.AuthFailed('status不等于200,失败')
    }

    const errCode = result.data.errcode
    const errMsg = result.data.errmsg
    if (errCode) {
      throw new global.errs.AuthFailed("openid获取失败: " + errCode + errMsg)
    }

    // 判断数据库是否存在微信用户 opendid
    // console.log(result.data)
    let user = await User.getUserByOpenID(result.data.openid)

    // 如果不存在，就创建一个微信小程序用户
    if (!user) {
      user = await User.createUserByOpenID(result.data)
    }
    // else {
    //   console.log("该用户已经存在在数据库中")
    // }

    return [generateToken(user.id, Auth.NORMAL_USER), result.data.openid , user.id]
  }

}


module.exports = {
  WeChatController
}