<template>
  <view class="open">
    <view class="item">
      <view class="title">Ad & AdCustom:Banner广告</view>
      <ad unit-id="id" ad-intervals="60" @load="e => console.log(e)" @error="e => console.log(e)" @close="e => console.log(e)" />
    </view>
    <view class="item">
      <view class="title">WebView:承载网页的容器，自动铺满整个小程序页面</view>
      <web-view src="https://mp.weixin.qq.com/" @message="(e)=>console.log(e)" />
    </view>
    <view class="item">
      <view class="title">OpenData:用于展示平台开放的数据</view>
      <open-data
        type="userAvatarUrl"
        defaultText="defaultText"
        defaultAvatar="https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4" />
      <open-data
        type="groupCloudStorage"
        defaultText="defaultText"
        defaultAvatar="https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4" />
      <open-data type="userCity" defaultText="defaultText" defaultAvatar="https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4" />
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
import "./index.scss";

export default {
  setup() {
    const msg = ref("Hello world");
    return {
      msg,
    };
  },
};
</script>
