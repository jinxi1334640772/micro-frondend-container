<template>
  <scroll-view :scrollY="true">
    <list-view>
      <view class="navigate">运用技术:taro 3.6 + taroUI + vue3 + TS + babel</view>
      <view class="navigate">使用Eslint进行代码风格检查</view>
      <view class="navigate">使用axios工具，请求远程跨域数据</view>
      <view class="navigate">使用pinia，全局状态管理</view>
      <view class="navigate">使用vue-router路由管理</view>
      <view class="navigate">使用@tarojs/plugin-html支持HTML元素开发</view>
      <view class="navigate">基于@tarojs/cli内置webpack5打包构建</view>
      <view class="navigate">NutUI 京东风格的轻量级移动端组件库</view>
    </list-view>
    <nut-button>这是@nutui/nutui-taro 4.2.3版本的nut-button组件</nut-button>
    <nut-cell title="展示弹出层" sub-title="副标题描述" desc="描述文字" is-link @click="show = true"></nut-cell>
    <nut-popup :style="{ padding: '30px 50px' }" v-model:visible="show">正文</nut-popup>
    <grid-view type="aligned" :main-axis-gap="1" :cross-axis-count="2" :cross-axis-gap="1" :max-cross-axis-extent="0">
      <button type="primary" :plain="true">Pinia数据：{{ counter.count }}</button>
      <button type="warn" size="default" @tap="onAdd">点击++</button>
    </grid-view>
    <button :class="styles.test" type="primary" @tap="tapHandle">分享图片</button>
    <button type="warn" @tap="tapDownload">下载图片,保存到系统相册</button>
    <button type="warn" @tap="chooseImage">选择或者拍照三张图片</button>
    <button type="primary" :plain="true" @tap="tapSendFile">转发文件到聊天</button>
    <button type="warn" @tap="setTitle">设置导航title</button>
    <button type="primary" @tap="setTabBarBadge">第一个tab显示Badge</button>
    <!-- <button type="primary" plain @tap="animation">创建一个动画</button> -->
    <button type="primary" @tap="playBackgroundAudio">播放背景音乐</button>
    <button type="primary" @tap="getUserProfile">getUserProfile获取用户信息</button>
    <button type="primary" @tap="authorizeForMiniProgram">获取录音权限后，开始录音</button>
    <button type="primary" @tap="chooseAddress">获取用户收货地址</button>
    <button type="primary" @tap="getWeRunData">获取用户过去三十天微信运动步数</button>
    <!-- <button type="primary" @tap="showRedPackage">拉取h5领取红包封面页</button> -->
    <button type="primary" @tap="getBatteryInfo">获取设备电量</button>
    <!-- <stick-section>StickySection</stick-section>
    <stick-header>StickyHeader</stick-header> -->
  </scroll-view>
</template>

<script setup>
// Taro 内置的一些 Composition API，可以从 @tarojs/taro 包中引入使用。
import Taro, {
  useDidShow,
  useRouter,
  useLoad,
  useReady,
  useDidHide,
  useUnload,
  usePullDownRefresh,
  useReachBottom,
  usePageScroll,
  useResize,
  useShareAppMessage,
  useTabItemTap,
  useShareTimeline,
  useAddToFavorites,
  useSaveExitState,
} from "@tarojs/taro";
import { ref } from "vue";
import "./index.scss";
import { useCounterStore } from "@/store/index";
import styles from "@/assets/style/test.module.scss";
console.log("styles", styles);
const counter = useCounterStore();
const onAdd = () => counter.count++;
const router = useRouter(); // = Taro.getCurrentInstance.router
const title = ref(0);
const show = ref(false);
const env = process.env.NODE_ENV;
const name = process.env.TARO_APP_NAME;
const type = process.env.TARO_ENV;
useDidShow(() => console.log("onShow"));
useLoad(() => console.log("onLoad"));
useReady(() => {
  // 使用 Taro.createSelectorQuery API 可以获取到节点的尺寸、定位等与渲染有关的信息,初次渲染时，在小程序触发 onReady 后，才能获取小程序的渲染层节点
  Taro.createSelectorQuery()
    .select("#target")
    .boundingClientRect()
    .exec(res => console.log("createSelectorQuery", res));
  // 在小程序平台，每个 CustomWrapper 实例对应一个原生自定义组件。小程序规定，如果要获取自定义组件内的节点,或者当组件的嵌套层级超过 baseLevel（默认 16 层）时，必须调用 .in 方法，其中 scope 是对应的自定义组件实例：Taro.createSelectorQuery().in(document.getElementById('target').ctx)。
});
useDidHide(() => console.log("onHide"));
useUnload(() => console.log("onUnload"));
const tapDownload = function () {
  // 没有授权的话，弹窗请示授权
  Taro.authorize({
    scope: "scope.writePhotosAlbum",
    success: function () {
      Taro.showToast({
        title: "已经得到授权，正在保存中",
        icon: "success",
        duration: 3000,
      });
      Taro.saveImageToPhotosAlbum({
        filePath: "../../assets/img/1.jpg", // 下载url
        // filePath: "https://photo.16pic.com/00/26/49/16pic_2649388_b.jpg", // 不能使用网络图片
        success(res) {
          console.log("图片下载成功");
        },
        fail: console.error,
      });
    },
  });
};
const chooseImage = function () {
  Taro.chooseImage({
    count: 3, // 下载url
    success(res) {
      console.log("图片下载成功");
    },
    fail: console.error,
  });
};
const tapHandle = function () {
  Taro.showShareImageMenu({
    path: "../../assets/img/1.jpg",
  });
};
const getUserProfile = function () {
  Taro.getUserProfile({
    desc: "获取个人信息用于页面展示效果",
    success(res) {
      console.log("获取个人信息成功", res);
      Taro.showToast({
        title: `获取个人信息:${res.rawData}`,
        icon: "success",
        duration: 3000,
      });
    },
  });
};
const chooseAddress = function () {
  // Taro.requirePrivacyAuthorize({success(res){console.log('requirePrivacyAuthorize',res);}})
  // 没有授权的话，弹窗请示授权
  Taro.authorize({
    scope: "scope.address",
    success: function () {
      // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
      Taro.showToast({
        title: "已经得到地址权限。",
        icon: "success",
        duration: 3000,
      });
      Taro.chooseAddress({
        success(res) {
          console.log("获取用户收货地址成功", res);
        },
      });
    },
  });
};
const getWeRunData = function () {
  Taro.getWeRunData({
    success(res) {
      console.log("获取用户过去三十天微信运动步数成功", res);
      Taro.showToast({
        title: res,
        icon: "success",
        duration: 3000,
      });
    },
  });
};
const getBatteryInfo = function () {
  Taro.getBatteryInfo({
    success(res) {
      console.log("获取设备电量成功", res);
      Taro.showToast({
        title: `电量是${res.level}`,
        icon: "success",
        duration: 3000,
      });
    },
  });
};
const showRedPackage = function () {
  Taro.showRedPackage({
    url: "https://photo.16pic.com/00/26/49/16pic_2649388_b.jpg",
    success(res) {
      console.log("拉取h5领取红包封面页", res);
    },
    fail(res) {
      console.log("拉取h5领取红包封面页失败", res);
    },
  });
};
const authorizeForMiniProgram = function () {
  Taro.getSetting({
    // // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    success: function (res) {
      console.log("Taro.getSetting success", res);
      if (!res.authSetting["scope.record"]) {
        // 没有授权的话，弹窗请示授权
        Taro.authorize({
          scope: "scope.record",
          success: function () {
            // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
            Taro.showToast({
              title: "已经得到录音权限，正在录音中。。。。",
              icon: "success",
              duration: 3000,
            });
            Taro.startRecord();
          },
        });
      } else {
        Taro.showToast({
          title: "已经得到录音权限，正在录音中。。。。",
          icon: "success",
          duration: 3000,
        });
        Taro.startRecord();
      }
    },
  });
};
const playBackgroundAudio = function () {
  Taro.playBackgroundAudio({
    title: "这是背景音乐标题",
    coverImgUrl: "https://photo.16pic.com/00/26/49/16pic_2649388_b.jpg",
    dataUrl: "https://music.163.com/song/media/outer/url?id=95475.mp3",
  });
};
const setTitle = function () {
  Taro.setNavigationBarTitle({
    title: `这是新的title ${title.value++}`,
  });
};
const setTabBarBadge = function () {
  Taro.setTabBarBadge({
    text: "Badge",
    index: 0,
  });
};
const animation = function () {
  const animationInstance = Taro.createAnimation({
    transformOrigin: "50% 50%",
    duration: 3000,
    timingFunction: "ease",
    delay: 0,
  });
  animationInstance.width(200).height(200).backgroundColor("#777777").matrix3d(11, 22, 33, 44, 11, 22, 33, 44, 11, 22, 33, 44, 11, 22, 33, 44).export();
};

const tapSendFile = function () {
  Taro.shareFileMessage({
    // filePath: "../../assets/img/1.jpg",
    filePath: "https://photo.16pic.com/00/26/49/16pic_2649388_b.jpg",
    fileName: "这是文件名",
    success() {
      console.log("分享图片成功");
    },
  });
};

usePullDownRefresh(() => console.log("usePullDownRefresh"));
</script>
