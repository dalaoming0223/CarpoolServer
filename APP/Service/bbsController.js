const {User, BBS, bbsComment, bbsLike} = require('../Models/db')

const { response } = require('./response')

class bbsController {
  
  static async add_bbs_by_userid(ctx){
    let ret_data = {}
    let { content, userid} = ctx.request.body
    try {
      let bbs = await BBS.create({
        user_id : userid,
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

  static async get_all_bbs(ctx){

    let ret_data = {}
    let queryResult = null
    let currentPage = parseInt(ctx.request.query.page) || 1
    let sortBy = 'created_at'
    let countPerPage = 10
    let pageCount = 0

    try {
      
      if(currentPage <= 0) {currentPage = 1}
      console.log('执行查询',currentPage)
      queryResult = await BBS.findAndCountAll({
        limit: countPerPage, //每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        order: [
          [sortBy, 'DESC']
        ],
        distinct: true,
        include: [{
          association: BBS.belongsTo(User,
            {
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
      response(ctx, ret_data, 200, 0)                                               
      
    } catch (error) {
      
    }
  }

  // 评论
  static async add_bbs_comment  (ctx) {
    let ret_data = {}
    let { content, bbs_id, user_id} = ctx.request.body
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

  //添加评论
}

module.exports = {
  bbsController
}