const {
  User,
  driverPublish,
  driverPublishParticipator,
  Driver,
  BBS,
  Admin
} = require('../Models/db')

const { response } = require('./response')
const { Auth } = require('../../Middlewares/auth')
const { generateToken } = require('../../Core/generateToken');

const Sequelize = require('sequelize')
const Op = Sequelize.Op


class adminController {

  static async add_admin(ctx) {
    let ret_data = {}
    let {
      username,
      password
    } = ctx.request.body
    try {
      let admin = await Admin.create({
        status: 1,
        username,
        password
      })

      ret_data['admin'] = admin
      response(ctx, ret_data, 201)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }

  //获取面板的一些初始数据
  static async get_panelGroup(ctx) {
    let ret_data = {}
    let queryResult = {}

    try {
      let user = await User.findAndCountAll({
        attributes: ['id', 'nick_name']
      })
      let driver = await Driver.findAndCountAll({
        attributes: ['driver_id']
      })
      let bbs = await BBS.findAndCountAll({
        attributes: ['bbs_id']
      })
      let driver_publish = await driverPublish.findAndCountAll({
        attributes: ['id']
      })

      ret_data['user'] = user
      ret_data['driver'] = driver
      ret_data['bbs'] = bbs
      ret_data['driver_publish'] = driver_publish

      response(ctx, ret_data, 20000)
    } catch (error) {

      response(ctx, ret_data, 400)
      
    }
  }

  //管理员登陆
  static async login_admin(ctx) {
    let ret_data ={}
    let {
      username,
      password
    } = ctx.request.body
    console.log(username, password)
    try {
      let admin = await Admin.findOne({
        where:{
          username,
          password,
        }
      })
      // console.log('admin:',admin)
      if(admin){
        let token = generateToken(admin.admin_id, Auth.ADMIN)
        // admin.token = token
        ret_data['token'] = token
        ret_data['admin'] = admin
        ret_data['isLogin'] = true
        response(ctx, ret_data, 200, 2)
      }else{
        response(ctx, ret_data, 401)
      }

    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
    
  }
}

module.exports = {
  adminController
}
