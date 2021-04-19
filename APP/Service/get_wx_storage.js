const getAccessToken = require('./get_access_token.js')
const rp = require('request-promise')
const fs = require('fs') // node文件模块


async function download(ctx, fileList) {
  const ACCESS_TOKEN = await getAccessToken()
  const options = {
    method: 'POST',
    uri: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
    body: {
      env: global.config.wx.cloud_env,
      file_list: fileList
    },
    json: true // Automatically stringifies the body to JSON
  }
  
  return await rp(options)
    .then((res) => {
      // POST succeeded...
      // console.log(res)
      return res
    })
    .catch(function (err) {
      // POST failed...
      console.log(err);
    })
  
}


module.exports = download