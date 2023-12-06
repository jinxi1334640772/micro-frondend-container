import type { UserConfigExport } from "@tarojs/cli";

export default {
  env: { // 这样就能在业务代码中通过 process.env.api === '/example/list' 来根据环境判断。
    baseUrl: JSON.stringify('http://rap2api.taobao.org/app/mock/315295'), 
    apiPath: JSON.stringify('/app/mock/315295'), 
    api: JSON.stringify('/example/list'), 
  },
  logger: { // 控制 Taro 编译日志的输出方式。
    quiet: false, // 是否简化输出日志。默认true
    stats: true // 是否输出 Webpack Stats 信息。 默认false
  },
  // plugins: ['@tarojs/plugin-vue-devtools'], // 开发环境配置vue-devtools工具调试，默认会弹出调试窗口
  mini: {},
  h5: {}
} satisfies UserConfigExport
