const { 
  User,
  contactPeople
} = require('../Models/db')

const {
  response
} = require('./response')

const Sequelize = require('sequelize')
const { where } = require('sequelize')
const Op = Sequelize.Op

class userController {
  
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
  }
}

module.exports = {
  userController
}