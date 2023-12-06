<template>
  <swiper
    class="box"
    :autoplay="true"
    :interval="interval"
    indicator-color="#999"
    @tap="handleTap"
    @animationfinish="handleAnimationFinish"
  >
    <swiper-item>
      <view class="text">1</view>
      <div>这里使用了@tarojs/plugin-html插件，使taro支持使用 HTML 标签编写 Taro 应用。记得引入css样式文件，这是浏览器标签默认样式：import '@tarojs/taro/html5.css' </div>
      <view>这是taro项目首页，使用了：</view>
      <view>taro 3.6 + taroUI + vue3 + TS + Eslint + babel技术栈</view>
      <view>使用了taroUI的swiper组件，每隔两秒反转一次</view>
    </swiper-item>
    <swiper-item>
      <view v-html="html"></view>
      <view class="text" v-for='item in list'>
        <view>星级：{{item.bar}}</view>
      </view>      
    </swiper-item>
  </swiper>
</template>

<script>
  import './index.scss'
  import Taro from '@tarojs/taro'
  import {getName} from '@/api/api'
  if (process.env.TARO_ENV !== 'h5') { 
    // 自定义HTML样式，包括了大多数 HTML5 标签，体积较大，不一定支持所有小程序容器。
    require('@tarojs/taro/html.css')
  }
  export default {
    name: 'Index',
    data() {
      return {
        interval: 3000,
        list:null,
        html: `<h3 id="htmlId" style="color: red">v-html节点，通过axios获取的远程数据</h3>`,
      }
    },
    methods: {
      handleTap() {
        Taro.navigateTo({
          url: '/pages/routeOne/index?id=2&type=test', // 传入参数 id=2&type=test
        })
      },
      handleAnimationFinish() {
        console.log('finish')
      },
    },
    // 可以使用所有的 Vue 生命周期方法
    created() {
      // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，而不是频繁地调用此 API
      this.$instance = Taro.getCurrentInstance()
    },
    mounted () {
      getName().then(value=>{
        this.list = value.array
      })
      const el = document.getElementById('htmlId')
      el.addEventListener('tap', this.handleTap) // 给HTML绑定事件
    },
    // 在 Vue2 和 Vue3 中，Taro 额外添加的生命周期方法的写法一致,页面组件除了支持 Vue 的生命周期方法外，还根据小程序的标准，额外支持以下生命周期：
    // onLoad 在小程序环境中对应页面的 onLoad。页面创建时执行。在此生命周期中通过访问 options 参数
    onLoad (options) {
      let instance = Taro.getCurrentInstance; // 小程序实例对象
      let router = instance.router; // 拿到router对象
    },
    // 一般情况下建议使用 Vue 的 onUnmounted 生命周期处理页面卸载时的逻辑。当某些特殊情况需要在页面的 onUnload的同一个事件循环中实现逻辑时才使用它（如对小程序的生命周期执行顺序有强依赖关系时）
    onUnload (options) {},
    // onReady 页面首次渲染完毕时执行。从此生命周期开始可以使用 createCanvasContext 或 createSelectorQuery 等 API 访问小程序渲染层的 DOM 节点。
    onReady () {},
    // 对应 onShow 页面显示/切入前台时触发。
    onShow () {},
    // 对应 onHide 页面隐藏/切入后台时触发。
    onHide () {},
    // 需要在全局配置的 window 选项中或页面配置中设置 enablePullDownRefresh: true。可以通过 Taro.startPullDownRefresh 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。当处理完数据刷新后，Taro.stopPullDownRefresh 可以停止当前页面的下拉刷新。
    onPullDownRefresh () {},
    // 可以在全局配置的 window 选项中或页面配置中设置触发距离 onReachBottomDistance。在触发距离内滑动期间，本事件只会被触发一次,需要 enablePullDownRefresh 配置
    onReachBottom(){},
    // 需要 enablePullDownRefresh 配置,监听用户滑动页面事件。
    onPageScroll(object){
      console.log('onPageScroll',object)
      // {scrollTop:'页面在垂直方向滚动的距离px'}
    },
    onAddToFavorites(object){
      console.log('onAddToFavorites',object)
      // {webviewUrl:'页面中包含 web-view 组件时，返回当前 web-view 的 url'}
      return {
        title:'这是添加收藏的自定义标题',
        imageUrl:'../../assets/img/美女.webp',
        query:'name=自定义query字段&age=22'
      }
    },
    // 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮,请在该页面配置中设置 enableShareAppMessage: true。
    onShareAppMessage(options){
      console.log('onShareAppMessage',options)
      let optionsCopy = {
        from:'button', // button：页面内转发按钮，menu：右上角转发菜单
        target:"object",// from为button时为该button，否则undefined
        webViewUrl:'页面中包含 WebView 组件时，返回当前 WebView 的 url'
      }
      return {
        title:'这是分享朋友的自定义title',
        path:'/src/pages/index/index?id=123',// 当前页面的path，绝对路径
        imageUrl:'../../assets/img/1.jpg'
      }
    },
    // 监听右上角菜单“分享到朋友圈”按钮的行为，并自定义分享内容。enableShareTimeline: true。
    onShareTimeline(){
      console.log('onShareTimeline')
      return {
        title:'这是自定义分享朋友圈的标题',
        imageUrl:'../../assets/img/美女.webp',
        query:'name=自定义query字段&age=22'
      }
    },
    onResize(){
      console.log('小程序屏幕旋转时触发')
    },
    // 点击 tab 时触发。{index:'tab的index',pagePath:'tab对应的path',text:'tab的text'}
    onTabItemTap(object){
      console.log('onTabItemTap',object)
    },
    // 每当小程序可能被销毁之前，页面回调函数 onSaveExitState 会被调用，可以进行退出状态的保存。只有微信小程序支持，基础库 2.7.4 开始支持。
    onSaveExitState(){},
  }

</script>
<style>
.index {}
</style>