const cloud = require('wx-server-sdk')

Taro.cloud.init({
  env: 'prod-2g1gmn0acfcdf2e8', // 后续 API 调用的默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境
  traceUser: true, // 是否在将用户访问记录到用户管理中，在控制台中可见
})
const Cloud = new Taro.cloud.Cloud({ resourceEnv: 'prod-2g1gmn0acfcdf2e8', }) // resourceAppid: '资源方 AppID'
Cloud.init({ env: 'prod-2g1gmn0acfcdf2e8' })
// 调用指定环境下的云函数
Cloud.callFunction({
  name: 'add', // 要调用的云函数名称
  data: { x: 1, y: 2, } // 传递给云函数的event参数
}).then(res => {
  console.log('云函数调用成功：', res);
}).catch(err => {
  console.log('云函数调用失败：', err);
})
Cloud.callContainer({
  // "config": {
  //   "env": "prod-2g1gmn0acfcdf2e8"
  // },
  "path": "/api/count",
  "header": {
    "X-WX-SERVICE": "koa-d1mu"
  },
  "method": "POST",
  "data": {
    "action": "inc"
  }
})

const main = async (event) => {
  const { ENV, OPENID, APPID } = cloud.getWXContext()
  // 如果云函数所在环境为 abc，则下面的调用就会请求到 abc 环境的数据库
  const dbResult = await cloud.database().collection('test').get()
  return {
    dbResult,
    ENV,
    OPENID,
    APPID,
  }
}