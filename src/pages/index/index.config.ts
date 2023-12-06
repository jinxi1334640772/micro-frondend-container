/**
 * 也可以再页面script中使用，就不需要这个文件了，例如
 * definePageConfig({
    navigationBarTitleText: '首页',
  })
 */
export default definePageConfig({
  navigationBarBackgroundColor:'#fff',
  navigationBarTitleText: '这是首页',
  navigationBarTextStyle:'black',
  // navigationStyle:'custom',
  // transparentTitle:'auto', // 先设置navigationStyle:'custom',导航栏透明设置。支持 always 一直透明 / auto 滑动/// 自适应 / none 不透明
  backgroundColor:'#666664',
  backgroundTextStyle:'dark',
  backgroundColorTop:'#888888', // ios
  backgroundColorBottom:'#222222', // ios
  enablePullDownRefresh:true,
  onReachBottomDistance:50,
  pageOrientation:'auto',
  disableScroll:false, // true整体不能上下滚动
  disableSwipeBack:true, // 禁止右滑手势返回
  enableShareAppMessage:true, // 是否启用分享给好友
  enableShareTimeline:true,// 是否启用分享朋友圈
  // usingComponents:object,// 页面自定义组件配置
  renderer:"webview", // 渲染后端
})
