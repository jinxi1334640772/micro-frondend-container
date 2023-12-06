export default defineAppConfig({
  networkTimeout:{request:5000,connectSocket:5000,uploadFile:5000,downloadFile:5000},
  debug:true,
  permission:{
    'scope.userLocation':{
      desc:'你的位置信息将用于小程序位置接口的效果展示'
    }
  },
  requiredBackgroundModes:['audio','location'],
  entryPagePath:'pages/index/index', // 默认首页，不填默认pages中第一个
  pages: [
    'pages/zhangjinxi/index', // 下面已经设置entryPagePath pages/index/index为首页
    'pages/index/index',
    'pages/jinxi/index',
    'pages/routeOne/index',
  ],
  // 独立分包是小程序中一种特殊类型的分包，可以独立于主包和其他分包运行。从独立分包中页面进入小程序时，不需要下载主包。当用户进入普通分包或主包内页面时，主包才会被下载。
  // 独立分包中不能依赖主包和其他分包中的内容，包括 js 文件、template、wxss、自定义组件、插件等（使用 分包异步化 时 js 文件、自定义组件、插件不受此条限制）；主包中的 app.wxss 对独立分包无效，应避免在独立分包页面中使用 app.wxss 中的样式；App 只能在主包内定义，独立分包中不能定义 App，会造成无法预期的行为；独立分包中暂时不支持使用插件。
  // "subpackages": [
  //   {
  //     "root": "moduleA",
  //     "pages": [
  //       "pages/rabbit/index",
  //     ] // 没有independent字段，为普通分包
  //   },
  //   {
  //     "root": "moduleB",
  //     "pages": [
  //       "pages/pear/index",
  //     ],
  //     "independent": true // 定义为独立分包（不能生成index.js文件而报错？？？）
  //   }
  // ],
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle:'default',
    backgroundColor:'#232323',
    backgroundTextStyle: 'light',
    backgroundColorTop:'blue', // ios
    backgroundColorBottom:'yellow', // ios
    enablePullDownRefresh:true, // 是否开启当前页的下拉刷新
    onReachBottomDistance:50, // 页面上拉触底触发事件时距离页面底部的距离
    pageOrientation:'auto' // 屏幕旋转设置
  },
  tabBar:{
    color:'red',
    selectedColor:'blue',
    backgroundColor:'white',
    borderStyle:'black',
    position:'bottom',
    custom:false,
    list:[
      {pagePath:'pages/index/index',text:'首页',iconPath:'./assets/img/图片 (10).jpg',selectedIconPath:'./assets/img/图片 (11).jpg'},
      {pagePath:'pages/zhangjinxi/index',text:'zhangjinxi',iconPath:'./assets/img/图片 (2).jpg',selectedIconPath:'./assets/img/图片 (3).jpeg'},
      {pagePath:'pages/jinxi/index',text:'jinxizhang',iconPath:'./assets/img/图片 (4).jpg',selectedIconPath:'./assets/img/图片 (8).jpg'},
    ]
  }
})
