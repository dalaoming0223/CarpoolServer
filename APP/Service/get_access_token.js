//先导包  19.11.22
const rp = require('request-promise')
const {
  appId,
  appSecret
} = require('../../Config/config').wx
// grant_type	string		是	填写 client_credential
// appid	    string		是	小程序唯一凭证，即 AppID，可在「微信公众平台 - 设置 - 开发设置」页中获得。（需要已经成为开发者，且帐号没有异常状态）
// secret	    string		是	小程序唯一凭证密钥，即 AppSecret，获取方式同 appid

const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

//再次声明  异步执行很重要 
// await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。
// 若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function。
// 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
// 另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

const updateAccessToken = async () => {
    const resStr = await rp(URL) //生成一个字符串
    const res = JSON.parse(resStr) //把这个字符串转化为JSON格式
    console.log('access_token过期，更新access_token  res：---------')
    console.log(res)
    //将access_token保存  写文件
    if (res.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}

const getAccessToken = async () => {
    //读文件
    try {
        const readRes = fs.readFileSync(fileName, 'utf8')
        const readObj = JSON.parse(readRes)
        console.log('-------获取文件中的accesstoken  readObj对象：---------')
        console.log(readObj)
        console.log('--------------------------------------------')
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if((nowTime - createTime) / 1000 / 60 / 60 >=2){
            await updateAccessToken()
            await getAccessToken()
        }
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }
}
//设置定时器
setInterval(async() =>{
    await updateAccessToken()
}, (7200 - 300) * 1000)
//updateAccessToken()
// console.log(getAccessToken())

module.exports = getAccessToken