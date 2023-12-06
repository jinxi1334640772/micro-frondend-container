
<template>
  <view>
    <view>
      <a>这是Home里的a标签</a>
      <view>使用vue-router路由器跳转路由测试,下面是路由出口router-view组件</view>
      <view>
        <view class="tab-box">
          <router-link class="tab-item" to="/" replace>Home replace</router-link>
          <router-link class="tab-item" to="/tab1?name=advancedcat&from=china" replace>/tab1?name=advancedcat&from=china</router-link>
          <router-link class="tab-item" to="/tab2/1234/8765">/tab2/1234/8765</router-link>
          <router-link class="tab-item" :to="{ name: 'TabTwo', params: { groupId:'1234',id: '9876' }}">{ name: 'TabTwo', params: { groupId:'1234',id: '9876' }}</router-link>
        </view>
        <router-view></router-view>
      </view>
    </view>
  </view>
</template>
<script>
import Taro from '@tarojs/taro'
export default {
  name:'Home',
  setup(){
    let instance = Taro.getCurrentInstance()
    let route = instance.router
    console.log('当前路由：',route,instance,this)
  }
}
</script>