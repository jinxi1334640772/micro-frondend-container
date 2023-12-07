const cloud = require('wx-server-sdk')

wx.cloud.init({
  env:'prod-2g1gmn0acfcdf2e8', // 后续 API 调用的默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境
  traceUser:true, // 是否在将用户访问记录到用户管理中，在控制台中可见
})

wx.cloud.callContainer({
  "config": {
    "env": "prod-2g1gmn0acfcdf2e8"
  },
  "path": "/api/count",
  "header": {
    "X-WX-SERVICE": "koa-d1mu"
  },
  "method": "POST",
  "data": {
    "action": "inc"
  }
})
// cloud.init({
//   env: cloud.DYNAMIC_CURRENT_ENV
// })
// const main = async (event) => {
//   const { ENV, OPENID, APPID } = cloud.getWXContext()

//   // 如果云函数所在环境为 abc，则下面的调用就会请求到 abc 环境的数据库
//   const dbResult = await cloud.database().collection('test').get()

//   return {
//     dbResult,
//     ENV,
//     OPENID,
//     APPID,
//   }
// }
// let cloudData = main()
// console.log('cloudData',cloudData)