const Router = require('koa-router')

const { handleResult } = require('../../../Core/callSuccessed')
const { bbsController } = require('../../Service/bbsController')

const router = new Router({
    prefix: '/v1/bbs'
})

router.post('/add', async (ctx)=>{
  await bbsController.add_bbs_by_userid(ctx)
})

router.get('/', async(ctx) =>{
  await bbsController.get_all_bbs(ctx)
})


// 添加评论

router.post('/addcomment', async (ctx) =>{
  await bbsController.add_bbs_comment(ctx)
})

module.exports = router