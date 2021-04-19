const {
  User,
  BBS,
  bbsComment,
  bbsLike
} = require('../Models/db')

const {
  response
} = require('./response')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
class bbsController {

  static async add_bbs_by_userid(ctx) {
    let ret_data = {}
    let {
      content,
      userid
    } = ctx.request.body
    try {
      let bbs = await BBS.create({
        user_id: userid,
        status: 1,
        content,
      })

      ret_data.id = bbs.bbs_id
      response(ctx, ret_data, 201)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
    ctx.response.status = 200
  }

  static async get_all_bbs(ctx) {

    let ret_data = {}
    let queryResult = null
    let currentPage = parseInt(ctx.request.query.page) || 1
    let sortBy = 'created_at'
    let countPerPage = parseInt(ctx.request.query.limit) || 5
    let pageCount = 0

    try {

      if (currentPage <= 0) {
        currentPage = 1
      }
      // console.log('执行查询',currentPage)
      queryResult = await BBS.findAndCountAll({
        limit: countPerPage, //每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        include: [{
          association: BBS.belongsTo(User, {
            foreignKey: 'user_id'
          }),
          attributes: ['avatar_url', 'nick_name']
        }]
      })
      pageCount = Math.ceil(queryResult.count / countPerPage)
      ret_data['data'] = queryResult.rows
      ret_data['total'] = queryResult.count
      ret_data['page'] = currentPage
      ret_data['pageCount'] = pageCount
      // console.log("queryResult",queryResult.rows)
      response(ctx, ret_data, 20000)

    } catch (error) {

    }
  }

  // 评论
  static async add_bbs_comment(ctx) {
    let ret_data = {}
    let {
      content,
      bbs_id,
      user_id
    } = ctx.request.body
    // console.log(content,bbs_id, user_id)
    try {
      let comment = await bbsComment.create({
        content,
        bbs_id,
        user_id
      })

      ret_data['bbs_id'] = comment.bbs_id
      response(ctx, ret_data, 201)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 400)
    }
  }

  static async get_bbs_comment_by_bbsID(ctx) {
    let ret_data
    let bbs_id = ctx.request.params.bbs_id
    // console.log(bbs_id)
    try {
      let bbs = await BBS.findByPk(bbs_id)
      if (bbs === null) {
        response(ctx, ret_data, 404)
      } else {
        let include = [{
          association: bbsComment.belongsTo(User, {
            foreignKey: 'user_id',
          }),
          attributes: ['id', 'nick_name', 'avatar_url']
        }]
        // console.log(BBS.getTableName())
        let queryResult = await bbs.getComment({
          attributes: ['id', 'content', 'created_at', 'is_top'],
          include: include,
          order: [
            ['updated_at', 'DESC']
          ]
        })
        if (queryResult.length > 0) {
          // console.log(queryResult)
          ret_data = {
            'bbscomment_list': queryResult
          }
        }else{
          ret_data = {
            'bbscomment_list': []
          }
        }
        response(ctx , ret_data, 200 ,0)
      }
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 401)
    }
  }
  
  // 喜欢
  static async like(ctx) {
    console.log('我要点赞了')
    let ret_data = {}
    let {bbs_id, user_id} = ctx.request.body
    try {
      const bbslike = await bbsLike.findOne({
        where: {
          bbs_id,
          user_id
        }
      })
      if(bbslike){
        console.log('此人点赞已存在')
      }else{
        await bbsLike.create({
          bbs_id,
          user_id
        })

        const bbs = await BBS.getData(bbs_id, user_id, false)
        await bbs.increment('like_count', {by: 1})
        ret_data['msg'] = '点赞成功'
      }
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 401)
    }
  }

  // 不喜欢
  static async dislike(ctx) {
    console.log('我要取消点赞了')
    let ret_data = {}
    let {bbs_id, user_id} = ctx.request.body
    try {
      const bbslike = await bbsLike.findOne({
        where: {
          bbs_id,
          user_id
        }
      })
      if(!bbslike){
        console.log('此人没有点赞过')
      }else{
        await bbslike.destroy({
          force: false
        })

        const bbs = await BBS.getData(bbs_id, user_id, false)
        await bbs.decrement('like_count', {by: 1})
        ret_data['msg'] = '取消点赞成功'
      }
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data, 401)
    }
  }
  
  // 搜索

  static async search_bbs(ctx) {
    let ret_data = {}
    let lookingfor = ctx.request.query.lookingfor
    let queryResult = null
    try {
      queryResult = await BBS.findAndCountAll({
        where : {
          [Op.or]: [
            {
              content: {
                [Op.like]: ['%'+lookingfor+'%']
              }
            },
            // {
            //   end_address: {
            //     [Op.like]: [lookingfor]
            //   }
            // }
          ]
        },
        distinct: true,
        include: [{
          association: BBS.belongsTo(User, {
            foreignKey: 'user_id'
          }),
          attributes: ['avatar_url', 'nick_name']
        }]
      })
      ret_data['queryResult'] = queryResult
      response(ctx, ret_data, 200)
    } catch (error) {
      console.log(error)
      response(ctx, ret_data , 400)
    }
  }

  // 管理页面相关 改变bbs状态  记得返回20000码
  static async change_bbs_status(ctx) {
    let ret_data = {}
    let bbs_id = ctx.request.params.bbs_id
    let status = ctx.request.body.status
    let queryResult = {}
    // console.log('bbs_id:', bbs_id)
    // console.log('status:', status)
    try {
      queryResult = await BBS.update(
        {status},
        {where: {
          bbs_id
        }}
      )
      // console.log(queryResult)
      ret_data['queryResult'] = queryResult
      ret_data['message'] = '更新成功'
      response(ctx, ret_data, 20000)
    } catch (error) {
      // ret_data['queryResult'] = ''
      ret_data['message'] = '更新失败'
      response(ctx, ret_data, 40001)
    }
  }
}

module.exports = {
  bbsController
}