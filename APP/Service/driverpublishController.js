const {
  User,
  driverPublish,
  driverPublishParticipator,
  Driver
} = require('../Models/db')
const {
  response
} = require('./response')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class driverPublishController {


  static async add_driverPublish(ctx, next) {
    let ret_data = {}
    let {
      start,
      end,
      surplusSeat,
      price,
      time,
      date,
      phone,
      note,
      userid
    } = ctx.request.body.formData
    const start_address = ctx.request.body.formData.startAddressInfo.address
    const start_name = ctx.request.body.formData.startAddressInfo.name
    const start_city = ctx.request.body.formData.startAddressInfo.addressComponent.city
    const start_district = ctx.request.body.formData.startAddressInfo.addressComponent.district
    const start_nation = ctx.request.body.formData.startAddressInfo.addressComponent.nation
    const start_province = ctx.request.body.formData.startAddressInfo.addressComponent.province
    const start_street = ctx.request.body.formData.startAddressInfo.addressComponent.street
    const start_streetnumber = ctx.request.body.formData.startAddressInfo.addressComponent.street_number
    const start_latitude = ctx.request.body.formData.startAddressInfo.latitude
    const start_longitude = ctx.request.body.formData.startAddressInfo.longitude

    const end_address = ctx.request.body.formData.endAddressInfo.address
    const end_name = ctx.request.body.formData.endAddressInfo.name
    const end_city = ctx.request.body.formData.endAddressInfo.addressComponent.city
    const end_district = ctx.request.body.formData.endAddressInfo.addressComponent.district
    const end_nation = ctx.request.body.formData.endAddressInfo.addressComponent.nation
    const end_province = ctx.request.body.formData.endAddressInfo.addressComponent.province
    const end_street = ctx.request.body.formData.endAddressInfo.addressComponent.street
    const end_streetnumber = ctx.request.body.formData.endAddressInfo.addressComponent.street_number
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
        note,
        finish_status: 1
      })

      ret_data.id = driverpublish.id
      response(ctx, ret_data, 201)
    } catch (error) {
      response(ctx, ret_data, 400)
    }

    // ctx.response.status = 200;
  }

  // 查询发布者发布的所有driver_publish
  static async get_driverPublish_by_user_id(ctx) {
    let ret_data = {}
    // console.log(ctx.request.params.userid)
    // console.log(ctx.request.query)
    let userid = ctx.request.params.userid
    let isSortByStartTime = ctx.request.query.isSortByStartTime
    let queryResult = null
    let sortBy = 'start_time'
    try {
      if (isSortByStartTime === true) {
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
          },
          include: [{
            model: driverPublishParticipator,
            // as: 'driverPublishParticipator',
            // attributes: ['user_id'
            // ]
            include: [{
              association: driverPublishParticipator.belongsTo(User, {
                foreignKey: 'user_id',
              }),
              attributes: ['avatar_url', 'nick_name', 'openid'],
            }]
          }]
        })
      } else {
        /**
         * 不根据出发时间排序
         */
        queryResult = await driverPublish.findAndCountAll({
          order: [
            ['created_at', 'DESC']
          ],
          where: {
            user_id: userid
          },
          include: [{
            model: driverPublishParticipator,
            // as: 'driverPublishParticipator',
            // attributes: ['user_id'
            // ]
            include: [{
              association: driverPublishParticipator.belongsTo(User, {
                foreignKey: 'user_id',
              }),
              attributes: ['avatar_url', 'nick_name', 'openid'],
            }]
          }]
        })
      }

      // console.log(queryResult)
      ret_data = {
        'queryResult': queryResult
      }
      // ctx.body = {
      //   queryResult
      // }
      // response(ctx, ret_data, 200)
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      // ctx.response.status = 400
      response(ctx, ret_data, 400)
    }
  }

  static async get_all_driverPublish(ctx) {
    let ret_data = {}
    let queryResult = null
    let currentPage = parseInt(ctx.request.query.page) || 1
    // console.log(currentPage)
    let sortBy = 'created_at'
    // let sortBy = 'start_time'
    let countPerPage = parseInt(ctx.request.query.limit) || 5
    try {
      if (currentPage <= 0) {
        currentPage = 1
      }
      queryResult = await driverPublish.findAndCountAll({
        limit: countPerPage, //每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        include: [{
          association: driverPublish.belongsTo(User, {
            foreignKey: 'user_id',
          }),
          attributes: ['avatar_url', 'nick_name', 'openid'],
        }]
      })
      // ctx.body = {
      //   queryResult
      // }
      ret_data = {
        'queryResult': queryResult
      }
      response(ctx, ret_data, 20000)
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
        let driverPublish = await driverPublish.destroy({
          where: {
            id: driver_publish_id
          }
        })
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
        } else {
          response(res, ret_data, 404);
        }
      } catch (error) {
        console.log('error.message', error.message)
      }
    }
  }

  static async update_driverPublish(ctx) {
    let ret_data = {}
    let {
      start,
      end,
      surplusSeat,
      price,
      time,
      date,
      phone,
      note
    } = ctx.request.body.formData
    let updated_at =
      console.log(ctx.req)
  }

  static async add_driverPublish_participator(ctx) {
    let ret_data = {}
    let participator = {}
    let {
      user_id,
      driverpublish_id
    } = ctx.request.body.participator
    let query = null
    console.log(user_id, driverpublish_id)
    try {
      query = await driverPublishParticipator.findAndCountAll({
        where: {
          user_id,
          driverpublish_id
        }
      })
      console.log('query:', query.count)
      if (!query.count) {
        participator = await driverPublishParticipator.create({
          user_id,
          driverpublish_id,
          join_status: 0 // 0 还未同意  1 已同意
        })
        ret_data['participator'] = participator
        response(ctx, ret_data, 201)
      } else {
        console.log('该用户已存在此订单中')
        response(ctx, ret_data, 400, '该用户已存在此订单中')
      }
      // participator = await driverPublishParticipator.create({
      //   user_id,
      //   driverpublish_id,
      //   join_status: 0 // 0 还未同意  1 已同意
      // })

    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }

  static async search_driverPublish_participator(ctx) {
    let ret_data = {}
    let driverpublish_id = ctx.request.query.driverpublish_id
    let queryResult = null
    let sortBy = 'created_at'
    try {
      queryResult = await driverPublishParticipator.findAll({
        where: {
          driverpublish_id
        },
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        include: [{
          association: driverPublishParticipator.belongsTo(User, {
            foreignKey: 'user_id',
          }),
          attributes: ['avatar_url', 'nick_name', 'openid'],
        }]
      })
      ret_data['participator_list'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
    }
  }

  static async update_driverPublish_participator_join_status(ctx) {
    let ret_data = {}
    let {
      participator_id,
      status
    } = ctx.request.query
    let result = null
    try {
      result = await driverPublishParticipator.update({
        join_status: status == 0 ? 0 : 1
      }, {
        where: {
          id: participator_id
        }
      })
      if (result[0] === 1)
        response(ctx, ret_data, 200, 1)
      else if (result[0] === 0)
        response(ctx, ret_data, 404)
      else
        response(ctx, ret_data, 400)
      // console.log('执行到这里')
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }

  //
  static async get_driverPublish_by_participator(ctx) {
    let ret_data = {}
    let userid = ctx.request.params.userid
    let queryResult = null
    // console.log(userid)
    try {
      queryResult = await driverPublishParticipator.findAndCountAll({
        where: {
          user_id: userid
        },
        include: [{
          association: driverPublishParticipator.belongsTo(driverPublish, {
            foreignKey: 'driverpublish_id',
          }),
          // attributes: ['avatar_url', 'nick_name', 'openid'],
          include: [{
              association: driverPublish.belongsTo(User, {
                foreignKey: 'user_id',
              }),
              attributes: ['avatar_url', 'nick_name', 'openid'],
              include: [{
                model: Driver
              }]
            },

          ]
        }]
      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
    }
  }

  // 获取最近日程
  static async get_recently_driverPublish_by_participator(ctx) {
    let ret_data = {}
    let userid = ctx.request.params.userid
    let queryResult = null

    var formatNumber = function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }

    var formatTime = function (date1, format) {
      var date = new Date(date1)
      var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
      var returnArr = [];
      returnArr.push(date.getFullYear());
      returnArr.push(formatNumber(date.getMonth() + 1));
      returnArr.push(formatNumber(date.getDate()));

      returnArr.push(formatNumber(date.getHours()));
      returnArr.push(formatNumber(date.getMinutes()));
      returnArr.push(formatNumber(date.getSeconds()));
      // var i in returnArr
      for (var i = 0; i < returnArr.length; i++) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    }


    // let recent_time = formatTime(new Date(new Date(new Date().setDate(new Date().getDate() -1)).setHours(0,0,0,0)), "Y-M-D h:m:s")
    let time = new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(0, 0, 0, 0))
    // console.log(userid)
    console.log(time)
    try {
      queryResult = await driverPublishParticipator.findOne({
        where: {
          user_id: userid
        },
        include: [{
          association: driverPublishParticipator.belongsTo(driverPublish, {
            foreignKey: 'driverpublish_id',
          }),
          where: {
            start_time: {
              [Op.gte]: time
            },
            finish_status: 1 // 1为订单仍然进行中
          },
          // attributes: ['avatar_url', 'nick_name', 'openid'],
          include: [{
            association: driverPublish.belongsTo(User, {
              foreignKey: 'user_id',
            }),
            attributes: ['avatar_url', 'nick_name', 'openid'],
          }]
        }],

      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
    }
  }

  // 用户评分
  static async grade_by_participator(ctx) {
    let ret_data = {}
    let participatorid = ctx.request.params.participatorid
    let score = ctx.request.body.score
    let queryResult = null
    console.log(participatorid, score)
    try {
      queryResult = await driverPublishParticipator.update({
        score: score
      }, {
        where: {
          id: participatorid
        }
      })
      ret_data['result'] = queryResult
      ret_data['msg'] = '更新成功'
      console.log(queryResult)
      ctx.body = {
        "msg": '也要笑死了'
      }
      // response(ctx, ret_data, 200, 1)
    } catch (error) {
      console.log(error)
      ret_data['msg'] = '更新失败'
      response(ctx, ret_data, 400)
    }
  }

  static async get_by_participator_id(ctx) {
    let ret_data = {}
    let participator_id = ctx.request.params.participator_id
    let queryResult = {}
    // console.log(participator_id)
    try {
      queryResult = await driverPublishParticipator.findOne({
        where: {
          id: participator_id
        },
        // raw: true,
        distinct: true,
        include: [{
          association: driverPublishParticipator.belongsTo(User, {
            foreignKey: 'user_id',
          }),
          // attributes: ['avatar_url', 'nick_name', 'openid'],
        }, {
          association: driverPublishParticipator.belongsTo(driverPublish, {
            foreignKey: 'driverpublish_id',
          }),
          include: [{
            association: driverPublish.belongsTo(User, {
              foreignKey: 'user_id',
            }),
            attributes: ['avatar_url', 'nick_name', 'openid'],
            include: [{
              model: Driver
            }]
          },

        ]
        }]
      })
      // console.log(queryResult)
      ret_data.participator_list = queryResult
      // console.log(ret_data)
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }

  static async search_driver_publish(ctx) {
    let ret_data = {}
    let lookingfor = ctx.request.query.lookingfor
    let queryResult = null
    try {
      queryResult = await driverPublish.findAndCountAll({
        where: {
          [Op.or]: [{
              start_address: {
                [Op.like]: ['%' + lookingfor + '%']
              }
            },
            {
              end_address: {
                [Op.like]: ['%' + lookingfor + '%']
              }
            },
            {
              end_name: {
                [Op.like]: ['%' + lookingfor + '%']
              }
            },
            {
              start_name: {
                [Op.like]: ['%' + lookingfor + '%']
              }
            }

          ]
        },
        distinct: true,
        include: [{
          association: driverPublish.belongsTo(User, {
            foreignKey: 'user_id',
          }),
          attributes: ['avatar_url', 'nick_name', 'openid'],
        }]
      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }
}



module.exports = {
  driverPublishController
}