const { response } = require('./response')
const { Driver,User } = require('../Models/db')
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
        let driver = await Driver.create({
            user_id,
            status: 2,
            driver_name: realname,
            plate_number: carnum,
            phone_number: phone,
            driver_license: fileIds,
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
    let currentPage = parseInt(ctx.request.query.page) || 1
    let countPerPage = parseInt(ctx.request.query.limit) || 5
    try {

      if (currentPage <= 0) {
        currentPage = 1
      }
      let driver = await Driver.findAndCountAll({
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
        {status},
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

  // 添加/查看 云开发图片的https地址
  static async update_img_http_location(driver_id, ctx) {  
    const str = 'cloud://carapp-ytfl0.6361-carapp-ytfl0-1300584294/STUcarpool/driverAuth1617672409072-507680.45340068644.png,cloud://carapp-ytfl0.6361-carapp-ytfl0-1300584294/STUcarpool/driverAuth1617672409087-603394.4890369846.jpeg'
    const file_id_list = str.split(',')
    // console.log(file_id_list)
    let file_list = []
    for (let i of file_id_list){
      let obj = {
        fileid: i,
        max_age: 120 * 60 * 100000
      }
      file_list.push(obj)
    }
    // console.log(file_list)
    let res_img = await download(ctx, file_list)
    console.log(res_img)
  }
}

module.exports = {
  driverAuthController
}