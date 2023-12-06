<template>
  <view class="routeOne">
    <view>{{ msg }}</view>
    <view>下面是拿到的路由参数：</view>
    <view>{{params}}</view>
    <view>history state :{{state}}</view>
    <view>location.href :{{href}}</view>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'
import Taro from '@tarojs/taro'
export default {
  setup () {
    // 建议在页面初始化时把 getCurrentInstance() 的结果保存下来供后面使用，而不是频繁地调用此 API
    const instance = Taro.getCurrentInstance()
    const msg = ref('这是第一个路由页面')
    let params = ref(null)
    params = instance.router.params; // //获取路由参数, 输出 { id: 2, type: 'test' }
    let state = window.history.state
    let href = window.location.href
    return {
      msg,
      params,
      state,
      href
    }
  },
}
</script>
