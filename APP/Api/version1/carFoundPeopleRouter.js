const Router = require('koa')

const { handleResult } = require('../../../Core/callSuccessed')
const { CarFoundPeople } = require('../../Models/carFoundPeopleModel')
const router = new Router({
    prefix: '/v1/carfindpeople'
})


//上传订单信息
// router.post('/upload', async(ctx) => {
  
// })

module.exports = router

