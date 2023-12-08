<template>
  <view>
    <button type="warn">使用vue-router路由器跳转路由测试</button>
    <view style="display: flex; justify-content: space-around; background: pink">
      <router-link style="background: pink; line-height: 100rpx; height: 100rpx; color: blue; text-align: center" to="/" replace>切换到Home</router-link>
      <router-link style="background: pink; line-height: 100rpx; height: 100rpx; color: blue; text-align: center" to="/tab1?name=advancedcat&from=china" replace
        >切换到tabOne</router-link
      >
    </view>
    <button type="primary">下面是路由出口router-view组件</button>
    <router-view></router-view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
export default {
  name: "Home",
  setup() {
    let instance = Taro.getCurrentInstance();
    let route = instance.router;
    console.log("当前路由：", route, instance, this);
  },
};
</script>
