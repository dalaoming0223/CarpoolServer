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

// 模糊搜索
router.get('/search',async(ctx) =>{
  await bbsController.search_bbs(ctx)
})

// 评论相关

router.post('/addcomment', async (ctx) =>{
  await bbsController.add_bbs_comment(ctx)
})


router.get('/getcomment/:bbs_id', async(ctx)=>{
  await bbsController.get_bbs_comment_by_bbsID(ctx)
})

// 评论点赞
router.post('/like', async(ctx)=> {
  await bbsController.like(ctx)
})

// 取消评论点赞
router.post('/dislike', async(ctx)=> {
  await bbsController.dislike(ctx)
})

// 浏览数
router.post('/addviewcount', async(ctx) => {
  await bbsController.add_bbs_view_count(ctx)
})

// 管理相关
router.post('/changestatus/:bbs_id', async(ctx)=> {
  await bbsController.change_bbs_status(ctx)
})



module.exports = router