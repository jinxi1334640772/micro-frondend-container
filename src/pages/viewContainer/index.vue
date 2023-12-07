<template>
  <view class="viewContainer">
    <view class="item">
      <view class="title">cover-view和cover-image:覆盖层</view>
      <view class="container" style="position: relative; width: 300rpx; height: 300rpx; background-color: peru">
        <text class="tip">已使coverView居中到当前容器中</text>
        <cover-view
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100rpx; height: 100rpx"
          :scrollY="true"
          :scrollWithAnimation="true"
          :scrollAnimationDuration="3000"
          @tap="play">
          <cover-image
            fixedTop="0"
            fixedLeft="20"
            src="@/assets/img/1.jpg"
            @tap="onImageTap" />
        </cover-view>
      </view>
    </view>
    <view class="item">
      <view class="title">swiper：轮播图组件</view>
      <swiper
        class="box"
        :autoplay="true"
        :interval="3000"
        indicator-color="red"
        indicatorActiveColor="blue"
        adjustHeight="highest"
        vertical
        circular
        indicatorDots
        @tap="handleTap">
        <swiper-item>
          <view>swiper-item 1</view>
          <view>下面是RootPortal组件:穿越到root底部</view>
          <root-portal :enable="true">
            <view>RootPortal组件，真实位置在swiper内，使整个子树从页面中脱离到body底部</view>
          </root-portal>
        </swiper-item>
        <swiper-item>
          <view>swiper-item 2</view>
          <view v-html="html"></view>
          <view style="color: blue; line-height: 30rpx">下面是通过axios获取的远程数据</view>
          <view class="text" v-for="item in list.value" :key="item.bar">
            <text style="color: green">级别：{{ item.foo }}级</text> <text>星级：{{ item.bar }}星</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="item">
      <view class="title">MatchMedia:符合medio条件才会展示</view>
      <match-media orientation="portrait" style="width: 400px" min-width="3" max-width="500">
        <view>当页面宽度在3~500px之间，portrait竖立时，才会展示这里,当前宽度为400px</view>
      </match-media>
    </view>
    <view class="item">
      <view class="title">MovableArea&MovableView:可拖动视图</view>
      <movable-area :scale-area="true" style="height: 200rpx; width: 500rpx; background: red">
        <movable-view
          direction="all"
          :scale="true"
          :animation="true"
          :inertia="true"
          :out-of-bounds="true"
          style="height: 100rpx; width: 100rpx; background: blue"
          @change="moveViewChange"
          >拖动试试！</movable-view
        >
      </movable-area>
    </view>
    <view class="item">
      <view class="title" @tap="pageShowToggle"> PageContainer组件：点击弹出显示 </view>
      <page-container :show="pageShow" :duration="1000" :z-index="10" :overlay="true" position="center" :round="true" :closeOnSlideDown="false" @clickOverlay="clickOverlay">
        小程序如果在页面内进行复杂的界面设计（如在页面内弹出半屏的弹窗、在页面内加载一个全屏的子页面等），
        用户进行返回操作会直接离开当前页面，不符合用户预期，预期应为关闭当前弹出的组件。
        为此提供“假页”容器组件，效果类似于popup弹出层，页面内存在该容器时，当用户进行返回操作，关闭该容器不关闭页面。
        返回操作包括三种情形，右滑手势、安卓物理返回键和调用navigateBack 接口。
      </page-container>
    </view>
  </view>
</template>

<script>
import { ref, reactive } from "vue";
import "./index.scss";
import { getName } from "@/api/api";
import Taro, { useReady } from "@tarojs/taro";
export default {
  setup() {
    const html = ref(`<h3 id="htmlId" style="color: red">这是通过vue的v-html渲染的节点</h3>`);
    let list = reactive({});
    let pageShow = ref(null);
    const play = function (e) {
      console.log("play", e);
    };
    const onImageTap = function (e) {
      console.log("onImageTap", e);
    };
    const moveViewChange = function (e) {
      console.log("moveViewChange", e);
    };
    const pageShowToggle = function (e) {
      console.log("pageShowToggle", e);
      pageShow.value = true;
    };
    const clickOverlay = function (e) {
      console.log("clickOverlay", e);
    };
    const handleTap = function (e) {
      console.log("handleTap swiper item", e);
    };
    useReady(() => {
      Taro.nextTick(() => {
        getName().then(value => {
          list.value = value.array;
          console.log("getName", list.value);
        });
      });
    });
    return {
      play,
      onImageTap,
      html,
      pageShow,
      list,
      moveViewChange,
      pageShowToggle,
      clickOverlay,
      handleTap,
    };
  },
};
</script>
