const { response } = require('./response')
const { Driver,User } = require('../Models/db')
const getAccessToken = require('./get_access_token.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const download = require('./get_wx_storage')


class driverAuthController {
  
  static async add_driver(ctx) {
    let ret_data = {}
    let { realname,user_id, idnum, carnum, cartype, phone, fileIds} = ctx.request.body.form
    // console.log(realname)
    try {
      let user = await Driver.findOne({
        where: {
          user_id
        }
      })

      // console.log(user)

      if(!user){
        let driver_license_http_location = await this.update_img_http_location(fileIds)
        // console.log('driver_license_http_location:',driver_license_http_location)
        let arr = []
        for (let i of driver_license_http_location) {
          arr.push(i.download_url)
        }
        let driver_license_http = arr.join(',')
        let driver = await Driver.create({
            user_id,
            status: 2,
            driver_name: realname,
            plate_number: carnum,
            phone_number: phone,
            driver_license: fileIds,
            driver_license_http,
            car_type: cartype,
            id_card: idnum

        })
        ret_data['msg'] = '创建成功，待审核'
        ret_data['driver_id'] = driver.driver_id
         
      }else {
        ret_data['msg'] = '该用户，已提交过司机认证信息'
      }
    
    response(ctx, ret_data, 201)


    } catch (error) {
       response(ctx, ret_data, 400)
    }
  }

  static async get_driver(ctx) {
    let ret_data = {}
    let user_id = ctx.request.params.userid

    try {
      let driver = await Driver.findOne({
        where: {
          user_id
        }
      })

      if(driver){
        ret_data['driver_list'] = driver       
      }
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      // ctx.response.status = 400
      response(ctx, ret_data, 400)
    }

  }

  static async get_all_driver(ctx) {
    let ret_data = {}
    let queryResult = null
    let driver_name = ctx.request.query.driver_name
    let currentPage = parseInt(ctx.request.query.page) || 1
    let countPerPage = parseInt(ctx.request.query.limit) || 5
    try {

      if (currentPage <= 0) {
        currentPage = 1
      }
      let driver
      if (!driver_name){
        driver = await Driver.findAndCountAll({
          where : {
            [Op.or]: [
              {
                driver_name: {
                  [Op.like]: ['%'+driver_name+'%']
                }
              },
            ]
          },
          limit: countPerPage,
          offset: countPerPage * (currentPage - 1),
          distinct: true,
          include: [{
            association: Driver.belongsTo(User, {
              foreignKey: 'user_id',
            }),
            attributes: ['avatar_url', 'nick_name', 'openid'],
          }]
        })
      }else{
        driver = await Driver.findAndCountAll({
          limit: countPerPage,
          offset: countPerPage * (currentPage - 1),
          distinct: true,
          include: [{
            association: Driver.belongsTo(User, {
              foreignKey: 'user_id',
            }),
            attributes: ['avatar_url', 'nick_name', 'openid'],
          }]
        })
      }


      if(driver){
        ret_data['driver_list'] = driver       
      }
      response(ctx, ret_data, 20000)
    } catch (error) {
      console.log(error)
      // ctx.response.status = 400
      response(ctx, ret_data, 400001)
    }
  }

  static async change_driver_status(ctx) {
    let ret_data = {}
    let driver_id = ctx.request.params.driver_id
    let status = ctx.request.body.status
    let queryResult = {}
    try {
      queryResult = await Driver.update(
        {status},// 
        {where: {
          driver_id
        }}
      )
      ret_data['queryResult'] = queryResult
      ret_data['message'] = '更新成功'
      response(ctx, ret_data, 20000)
    } catch (error) {
      ret_data['message'] = '更新失败'
      response(ctx, ret_data, 40001)
    }
  }

  static async update_driver(ctx) {
    let ret_data = {}
    let id = ctx.request.params.id
    let queryResult = null
    let { driver_name, plate_number, phone_number, id_card, car_type} = ctx.request.body.formData
    console.log(driver_name)
    try {
      queryResult = await Driver.update({
        status:2,
        plate_number, phone_number, driver_name, car_type,id_card
      },
      {where: {
        driver_id:id
      }
      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200, 1)  
    } catch (error) {
      response(ctx, ret_data, 400)  
    }
    
  }

  // 添加/查看 云开发图片的https地址
  static async update_img_http_location(fileStr) {  
    await getAccessToken()
    const file_id_list = fileStr.split(',')
    let file_list = []
    for (let i of file_id_list){
      let obj = {
        fileid: i,
        max_age: 120 * 60 * 100000
      }
      file_list.push(obj)
    }
    // console.log(file_list)
    let res_img = await download(file_list)
    // console.log(res_img)
    return res_img.file_list
  }
}

module.exports = {
  driverAuthController
}