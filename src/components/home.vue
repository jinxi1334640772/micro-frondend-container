<template>
  <view style="background-color: bisque;width: 100%;height: 100%;">这是Home页面</view>
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