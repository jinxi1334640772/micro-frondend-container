<template>
  <view>这是tabOne页面</view>
</template>
<script>
import Taro from '@tarojs/taro'
export default {
  name:'TabOne',
  setup(){
    let instance = Taro.getCurrentInstance()
    let route = instance.router
    console.log('当前路由：',route,instance,this)
  }
}
</script>