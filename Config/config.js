module.exports = {
  environment: 'dev',
  database: {
    dbName: 'carpool',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
  },
  security: {
    secretKey: 'dalaoming',
    // 过期时间 1小时
    expiresIn: 60
  },
  wx :{
    appId: 'wx6ba67bcfdd63a87b',
    appSecret: 'f9d0544cfb4117a99e847e062c20fd43',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    cloud_env: 'carapp-ytfl0'
  }
}
