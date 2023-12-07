<template>
  <view class="zhangjinxi">
    <text id="target" ref="textRef">text组件：{{ msg }}</text>
    <view>Pinia数据：{{ counter.count }}</view>
    <view @tap="onAdd">点击++</view>
  </view>
</template>

<script>
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
export default {
  setup() {
    console.log("styles", styles);
    const counter = useCounterStore();
    const onAdd = () => counter.count++;
    setTimeout(
      () =>
        Taro.setNavigationBarTitle({
          title: "这是使用Taro.setNavigationBarTitle设置的title",
        }),
      3000
    );
    const router = useRouter(); // = Taro.getCurrentInstance.router
    const msg = ref("这是我的第二个页面");
    const textRef = ref(null);
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
        .exec((res) => console.log("createSelectorQuery", res));
      // 在小程序平台，每个 CustomWrapper 实例对应一个原生自定义组件。小程序规定，如果要获取自定义组件内的节点,或者当组件的嵌套层级超过 baseLevel（默认 16 层）时，必须调用 .in 方法，其中 scope 是对应的自定义组件实例：Taro.createSelectorQuery().in(document.getElementById('target').ctx)。
      console.log("onReady", textRef);
    });
    useDidHide(() => console.log("onHide"));
    useUnload(() => console.log("onUnload"));
    usePullDownRefresh(() => console.log("usePullDownRefresh"));
    return { msg, env, name, type, onAdd, counter };
  },
};
</script>
