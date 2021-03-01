const { User, driverPublish} = require('../Models/db')
const { handleResult } = require('../../Core/callSuccessed')

class PublishController {
  
  
  static async add_driverPublish(ctx, next){

    let {start,end,surplusSeat,price,time,date,phone,note,userid}=ctx.request.body.formData
    const start_address = ctx.request.body.formData.startAddressInfo.address
    
    const start_city= ctx.request.body.formData.startAddressInfo.addressComponent.city
    const start_district= ctx.request.body.formData.startAddressInfo.addressComponent.district
    const start_nation= ctx.request.body.formData.startAddressInfo.addressComponent.nation
    const start_province= ctx.request.body.formData.startAddressInfo.addressComponent.province
    const start_street=  ctx.request.body.formData.startAddressInfo.addressComponent.street
    const start_streetnumber= ctx.request.body.formData.startAddressInfo.addressComponent.street_number
    
    const end_address = ctx.request.body.formData.endAddressInfo.address

    const end_city= ctx.request.body.formData.endAddressInfo.addressComponent.city
    const end_district= ctx.request.body.formData.endAddressInfo.addressComponent.district
    const end_nation= ctx.request.body.formData.endAddressInfo.addressComponent.nation
    const end_province= ctx.request.body.formData.endAddressInfo.addressComponent.province
    const end_street=  ctx.request.body.formData.endAddressInfo.addressComponent.street
    const end_streetnumber= ctx.request.body.formData.endAddressInfo.addressComponent.street_number
    // console.log(surplusSeat instanceof Array)
    // console.log('测试'+ start_city + end_city)

    try {
      let start_time = date + ' ' + time
      // console.log(start_time)
      let driverpublish = await driverPublish.create({
        user_id: userid,
        phone,
        price,
        personNum:surplusSeat,
        start_time,
        start_address,
        start_city, 
        start_district, 
        start_nation, 
        start_province, 
        start_street,  
        start_streetnumber, 
        end_address,  
        end_city, 
        end_district, 
        end_nation, 
        end_province,
        end_street, 
        end_streetnumber,
        note
      })
      ctx.response.status = 200
      ctx.body = {
        msg: '添加成功'
      }
    } catch (error) {
      console.log('加入blog时错误的信息',error)
      ctx.response.status = 400
      ctx.body = {
        msg: '添加失败'
      }
    }

    ctx.response.status = 200;
  }

  static async get_driverPublish_by_user_id(ctx){
    // console.log(ctx.request.params.userid)
    // console.log(ctx.request.query)
    let userid = ctx.request.params.userid
    let isSortByStartTime = ctx.request.query.isSortByStartTime
    let queryResult = null
    let sortBy = 'start_time'
    try {
      if(isSortByStartTime==true){
        /**
         * 根据出发时间排序
         */
        queryResult = await driverPublish.findAndCountAll({
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
        queryResult = await driverPublish.findAndCountAll({
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
    }
  }

  static async get_all_driverPublish(ctx){
    
  }
}


module.exports = {
  PublishController
}