<template>
  <view>这是tabTwo页面</view>
</template>
<script>
import Taro from '@tarojs/taro'
export default {
  name:'TabTwo',
  setup(){
    let instance = Taro.getCurrentInstance()
    let route = instance.router
    console.log('当前路由：',route,instance,window,this)
  }
}
</script>