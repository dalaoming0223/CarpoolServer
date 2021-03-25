const { User, driverPublish , driverPublishParticipator} = require('../Models/db')
const { response } = require('./response')

class driverPublishController {
  
  
  static async add_driverPublish(ctx, next){
    let ret_data = {}
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
      let driverpublish = await driverPublish.create({
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

      ret_data.id = driverpublish.id
      response(ctx, ret_data, 201)
    } catch (error) {
      response(ctx, ret_data , 400)
    }

    // ctx.response.status = 200;
  }

  static async get_driverPublish_by_user_id(ctx){
    let ret_data ={}
    // console.log(ctx.request.params.userid)
    // console.log(ctx.request.query)
    let userid = ctx.request.params.userid
    let isSortByStartTime = ctx.request.query.isSortByStartTime
    let queryResult = null
    let sortBy = 'start_time'
    try {
      if(isSortByStartTime===true){
        /**
         * 根据出发时间排序
         */
        queryResult = await driverPublish.findAndCountAll({
          distinct: true,
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
        queryResult = await driverPublish.findAndCountAll({
          order: [
            ['created_at', 'DESC']
          ],
          where: {
            user_id: userid
          }
        })
      }

      // console.log(queryResult)
      ret_data= {
        'queryResult': queryResult
      }
      // ctx.body = {
      //   queryResult
      // }
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      // ctx.response.status = 400
      response(ctx, ret_data, 400)
    }
  }

  static async get_all_driverPublish(ctx){
    let ret_data ={}
    let queryResult = null
    let currentPage = parseInt(ctx.request.query.page) || 1
    // console.log(currentPage)
    let sortBy = 'created_at'
    // let sortBy = 'start_time'
    let countPerPage = parseInt(ctx.request.query.limit)|| 5
    try {
      if (currentPage <= 0) {currentPage = 1}
      queryResult = await driverPublish.findAndCountAll({
        limit: countPerPage, //每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        // include: [{
        //   model: User
        // }]

        include: [{
            association: driverPublish.belongsTo(User,
                {
                    foreignKey: 'user_id',
                }),
            attributes: ['avatar_url', 'nick_name' , 'openid'],
        }]
      })
      // ctx.body = {
      //   queryResult
      // }
      ret_data = {
        'queryResult': queryResult
      }
      response(ctx,ret_data,20000)
    } catch (error) {
      console.log(error)
      ctx.response.status = 400
    }
  }

  static async delete_driverPublish(ctx) {
    let ret_data = {}
    let driver_publish_id = ctx.request.params.id
    if (driver_publish_id) {
      try {
        let driverPublish = await driverPublish.destroy(
          {
            where: {id : driver_publish_id}
          }
        )
        // if (driverPublish === null){
        //   // ctx.response.status = 404
        //   // ctx.body = {
        //   //   msg: 'Not found'
        //   // }
        //   response(ctx, ret_data, 404)
        // }
        // else {
        //   ctx.body = {
        //     msg: ''
        //   }
        // }
        if (driverPublish > 0) {
          response(res, ret_data, 200, -1);
        }
        else {
          response(res, ret_data, 404);
        }
      } catch (error) {
        console.log('error.message',error.message)
      }
    }
  }

  static async update_driverPublish(ctx) {
    let ret_data = {}
    let {start,end,surplusSeat,price,time,date,phone,note} = ctx.request.body.formData
    let updated_at = 
    console.log(ctx.req)
  }

  static async add_driverPublish_participator(ctx) {
    let ret_data = {}
    let {user_id, driverpublish_id} = ctx.request.body.participator
    try {
      let participator = await driverPublishParticipator.create({
        user_id,
        driverpublish_id
      })
      ret_data['participator'] = participator
      response(ctx, ret_data ,201)
    } catch (error) {
      response(ctx, ret_data , 400)
    }
  }
}



module.exports = {
  driverPublishController
}