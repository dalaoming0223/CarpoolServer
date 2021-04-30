const util = require('util')
const axios = require('axios')

const { 
  User,
  contactPeople
} = require('../Models/db')

const {
  response
} = require('./response')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class userController {
  static async login2(ctx) {
    let ret_data = {}
    let {code} = ctx.request.body
    // 格式化url  替换掉 %s 
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code)

    try {
      const result = await axios.get(url)
      // console.log('result', result)
      ret_data['result'] = result.data
      response(ctx, ret_data, 200)
    } catch (error) {
      response(ctx, ret_data, 400)
    }
  }
  
  static async decodePhoneNum(ctx) {
    let ret_data = {}
  }

  static async add_contact_people(ctx) {
    let ret_data = {}
    let {
      user_id,
      name,
      phone_num
    } = ctx.request.body
    let queryResult = null
    try {
      queryResult = await contactPeople.create({
        user_id,
        phone_num,
        name
      })
      ret_data['contact_people'] = queryResult
      response(ctx, ret_data, 201)
    } catch (error) {
      console.log(error)
      ret_data['error_msg'] = error
      response(ctx, ret_data, 400)
    }

  }

  static async update_contact_people(ctx) {
    let ret_data = {}
    let {
      id,
      name,
      phone_num
    } = ctx.request.body
    let queryResult = null
    try {
      queryResult = await contactPeople.update({
        phone_num,
        name
      },
      {where: {
        id:id
      }
      }
      )
      ret_data['contact_people'] = queryResult
      response(ctx, ret_data, 201)
    } catch (error) {
      console.log(error)
      ret_data['error_msg'] = error
      response(ctx, ret_data, 400)
    }

  }

  static async search_contact_people(ctx) {
    let ret_data = {}
    let user_id = ctx.params.user_id
    let queryResult = null
    try {
      queryResult = await contactPeople.findAndCountAll({
        where:{
          user_id
        }
      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      ret_data['error_msg'] = error
      response(ctx, ret_data, 400)
    }
  }

  static async delete_contact_people(ctx) {
    let ret_data = {}
    let {id} = ctx.request.body
    let queryResult = null
    try {
      queryResult = await contactPeople.destroy({
        where:
        {
          id
        }
      })
      console.log(queryResult)
      ret_data['contact_people'] = queryResult
      response(ctx, ret_data, 200, -1)
    } catch (error) {
      console.log(error)
      ret_data['error_msg'] = error
      response(ctx, ret_data, 400)
    }
  }
}

module.exports = {
  userController
}