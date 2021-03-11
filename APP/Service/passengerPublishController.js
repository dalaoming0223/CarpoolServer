const { User, passengerPublish} = require('../Models/db')

const { response } = require('./response')


class passengerPublishController {

  static async add_passengerPublish(ctx ,next){
    let ret_data
    let {start,end,surplusSeat,price,time,date,phone,note,userid}=ctx.request.body.formData
    const start_address = ctx.request.body.formData.startAddressInfo.address
    const start_name = ctx.request.body.formData.startAddressInfo.name
    const start_city= ctx.request.body.formData.startAddressInfo.addressComponent.city
    const start_district= ctx.request.body.formData.startAddressInfo.addressComponent.district
    const start_nation= ctx.request.body.formData.startAddressInfo.addressComponent.nation
    const start_province= ctx.request.body.formData.startAddressInfo.addressComponent.province
    const start_street=  ctx.request.body.formData.startAddressInfo.addressComponent.street
    const start_streetnumber= ctx.request.body.formData.startAddressInfo.addressComponent.street_number
    const start_latitude = ctx.request.body.formData.startAddressInfo.latitude
    const start_longitude = ctx.request.body.formData.startAddressInfo.longitude

    const end_address = ctx.request.body.formData.endAddressInfo.address
    const end_name = ctx.request.body.formData.endAddressInfo.name
    const end_city= ctx.request.body.formData.endAddressInfo.addressComponent.city
    const end_district= ctx.request.body.formData.endAddressInfo.addressComponent.district
    const end_nation= ctx.request.body.formData.endAddressInfo.addressComponent.nation
    const end_province= ctx.request.body.formData.endAddressInfo.addressComponent.province
    const end_street=  ctx.request.body.formData.endAddressInfo.addressComponent.street
    const end_streetnumber= ctx.request.body.formData.endAddressInfo.addressComponent.street_number
    const end_latitude = ctx.request.body.formData.endAddressInfo.latitude
    const end_longitude = ctx.request.body.formData.endAddressInfo.longitude
    // console.log(surplusSeat instanceof Array)
    // console.log('测试'+ start_city + end_city)

    try {
      let start_time = date + ' ' + time
      // console.log(start_time)
      let passenger = await passengerPublish.create({
        user_id: userid,
        phone,
        price,
        personNum: surplusSeat,
        start_name,
        start_time,
        start_address,
        start_city, 
        start_district, 
        start_nation, 
        start_province, 
        start_street,  
        start_streetnumber,
        start_latitude,
        start_longitude,
        end_name,
        end_address,  
        end_city, 
        end_district, 
        end_nation, 
        end_province,
        end_street, 
        end_streetnumber,
        end_latitude,
        end_longitude,
        note
      })
      // ctx.response.status = 200
      // ctx.body = {
      //   msg: '添加成功'
      // }
      ret_data.id = driverpublish.id
      response(ctx, ret_data, 201)
    } catch (error) {
      // console.log('加入blog时错误的信息',error)
      // ctx.response.status = 400
      // ctx.body = {
      //   msg: '添加失败',
      //   error
      // }
      response(ctx, ret_data , 400)
    }

    ctx.response.status = 200;
  }

  static async get_passengerPublish_by_user_id(ctx){
    let userid = ctx.request.params.userid
    let isSortByStartTime = ctx.request.query.isSortByStartTime
    let queryResult = null
    let sortBy = 'start_time'
    try {
      if(isSortByStartTime==true){
        /**
         * 根据出发时间排序
         */
        queryResult = await passengerPublish.findAndCountAll({
          include: [{
            model: User,
            attributes: ['openid']
          }],
          order: [
            [sortBy, 'DESC']
          ],
          where: {
            user_id: userid
          }
        })
      }else{
        /**
         * 不根据出发时间排序
         */
        queryResult = await passengerPublish.findAndCountAll({
          include: [{
            model: User,
            attributes: ['openid']
          }],
          order: [
            ['created_at', 'DESC']
          ],
          where: {
            user_id: userid
          }
        })
      }

      // console.log(queryResult)
      ctx.body = {
        queryResult
      }
    } catch (error) {
      console.log(error)
      ctx.response.status = 400
      ctx.body = {
        mag: '通过用户获取乘客发布失败',
        error
      }
    }
  }

  static async get_all_passengerPublish(ctx){
    let queryResult = null
    let currentPage = parseInt(ctx.request.query.page) || 1
    // console.log(currentPage)
    let sortBy = 'created_at'
    let countPerPage = 5
    try {
      if (currentPage <= 0) {currentPage = 1}
      queryResult = await passengerPublish.findAndCountAll({
        limit: countPerPage, //每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        include: [{
            association: passengerPublish.belongsTo(User,
              {
                  foreignKey: 'user_id',
              }),
            attributes: ['avatar_url', 'nick_name'],
        }]
      })
      ctx.body = {
        queryResult
      }
    } catch (error) {
      ctx.response.status = 400
    }

  }
}


module.exports = {
  passengerPublishController
}