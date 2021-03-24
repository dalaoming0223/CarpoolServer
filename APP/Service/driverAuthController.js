const { response } = require('./response')
const { Driver } = require('../Models/db')

class driverAuthController {
  
  static async add_driver(ctx) {
    let ret_data = {}
    let { realname,user_id, carnum, cartype, phone, fileIds} = ctx.request.body.form
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
            car_type: cartype

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
}

module.exports = {
  driverAuthController
}