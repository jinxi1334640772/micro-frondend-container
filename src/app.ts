import { createApp } from 'vue'
import { setGlobalDataPlugin } from '@tarojs/taro'
import { createPinia } from 'pinia'
import './app.scss'
// 使用vue-router路由库
import { createRouter,createWebHistory } from 'vue-router'
// 自定义组件
import Home from './components/home.vue'
import Tab1 from './components/tabOne.vue'
import Tab2 from './components/tabTwo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/tab1', component: Tab1 },
  { name:'TabTwo',path: '/tab2/:groupId/:id', component: Tab2 },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
const App = createApp({
    // 可以使用所有的 Vue 生命周期方法
    mounted () {},
    // 在 Vue2 和 Vue3 中，Taro 额外添加的生命周期方法的写法一致
    // 入口组件除了支持 Vue 的生命周期方法外，还根据小程序的标准，额外支持以下生命周期：
    // 对应 onLaunch
    onLaunch (options) {
      // let instance = getCurrentInstance() // 拿到小程序实例信息
      console.log('onLaunch',options)
      /**
       * {
        path:'启动小程序的路径',
        scene:'启动小程序的场景',
        query:'启动小程序的查询参数',
        referrerInfo:{ // "来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}"
          appid:'来源小程序，或者公众号（微信中）',
          extraData:"来源小程序传过来的数据，微信和百度小程序在 scene=1037 或 1038 时支持",
          sourceServiceId:'来源插件，当处于插件运行模式时可见'
        }
      }
       */
    },
    // 对应 onHide
    onShow (options) {
      console.log('App onShow. this is options', options)
    },
    onHide () {console.log('onHide')},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  // 小程序发生脚本错误或 API 调用报错时触发
    onError(error){console.log('onError',error)},
    // 程序要打开的页面不存在时触发。
    onPageNotFound(object){
      console.log('onPageNotFound',object)
      /**{
        path:'不存在页面的路径',
        query:'不存在页面时的query',
        isEntryPage:'是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）'
      } */
    },
    // 小程序有未处理的 Promise 拒绝时触发。
    onUnhandledRejection(object){
      console.log('onUnhandledRejection',object)
      /**{
        reason:'拒绝原因，一般是一个 Error 对象',
        promise:'被拒绝的 Promise 对象'
      } */
    }
})
App.use(router)
App.use(setGlobalDataPlugin,{
  name:'张进喜',
  des:'这是全局数据',
  use:'const app = Taro.getApp();console.log(app.x)'
})
App.use(createPinia())
export default App
