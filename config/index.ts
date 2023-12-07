import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'
const path = require('node:path')
// 配置信息参考：https://taro-docs.jd.com/docs/config-detail
// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport = {
    projectName: 'taro-project',
    date: '2023-12-5',
    designWidth: 750,
    deviceRatio: { 640: 2.34 / 2, 750: 1, 375: 2, 828: 1.81 / 2 },
    sourceRoot: 'src',
    // outputRoot: 'dist',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    jsMinimizer:'terser', // 默认值 terser 配置 JS 压缩工具。
    alias: {
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/store': path.resolve(__dirname, '..', 'src/store'),
      '@/api': path.resolve(__dirname, '..', 'src/api'),
      '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    },
    presets:[],// 一个 preset 是一系列 Taro 插件的集合，配置语法同 plugins。
    plugins: [
      ['@tarojs/plugin-platform-weapp', {
        enablekeyboardAccessory: true
      }],
      // [
      //   '@tarojs/plugin-mock',
      //   {
      //     mocks: {
      //       '/api/user/1': {
      //         name: 'judy',
      //         desc: 'Mental guy',
      //       },
      //     },
      //   },
      // ],
      // 在小程序环境下 runtime 注入模拟实现的 XMLHttpRequest , 从而支持在小程序环境中使用 web 生态下的各种网络请求库,至此，你可以在 h5、小程序、react native 中畅快使用 axios 库作为请求库。
      '@tarojs/plugin-http',
      "@tarojs/plugin-html", // 以支持在 Taro 中使用 html 标签开发组件。为了使用vue-router路由库
      [ // Taro 中可以通过修改 @tarojs/plugin-framework-vue3 的配置项去设置 vueLoader 的配置项：
        '@tarojs/plugin-framework-vue3',
        {
          vueLoaderOption: {
            compilerOptions: {
              isCustomElement: (tag) => tag.includes('ec-canvas'),
              whitespace: 'preserve',
            },
            reactivityTransform: true, // 开启vue3响应性语法糖
          },
        },
      ],
    ],
    defineConstants: {},
    copy: { // 用于把文件从源码目录直接拷贝到编译后的生产目录。
      patterns: [
      // { from: 'src/asset/tt/', to: 'dist/asset/tt/', ignore: ['*.js'] }, // 指定需要 copy 的目录
      // { from: 'src/asset/tt/sd.jpg', to: 'dist/asset/tt/sd.jpg' }, // 指定需要 copy 的文件
    ], options: {ignore: ['*.js', '*.css'], } }, // 拷贝配置，可以指定全局的 ignore：
    framework: 'vue3', // 使用的开发框架。可选值：react、preact、nerv、vue、vue3。
    compiler: 'webpack5', // 使用的编译工具。可选值：webpack4、webpack5。也可以配置为object
    // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    cache: { enable: true },
    mini: { // 专属于小程序的配置。
      hot:true,
      baseLevel:16,
      postcss: {
        pxtransform: { enable: true, config: {} },
        url: { 
          enable: true, // 小程序端样式引用本地资源内联
          config: { limit: 1024 ,maxSize: 10, } // 设定转换尺寸上限
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain,webpack) { // 自定义 Webpack 配置。
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        // Taro 3.3+ 假设我们需要解析 NPM 包 taro-mobile 里面的多端文件，可以利用 WebpackChain 为 MultiPlatformPlugin 插件添加 include 配置：
        chain.resolve.plugin('MultiPlatformPlugin')
        .tap(args => {
          args[2]["include"] = ['@taro-mobile']
          return args
        })
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: { enable: true, config: {} },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        // Taro 3.3+ 假设我们需要解析 NPM 包 taro-mobile 里面的多端文件，可以利用 WebpackChain 为 MultiPlatformPlugin 插件添加 include 配置：
        chain.resolve.plugin('MultiPlatformPlugin')
        .tap(args => {
          args[2]["include"] = ['@taro-mobile']
          return args
        })
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: { enable: true,  } // 默认为 false，如需使用 css modules 功能，则设为 true
      },
      resolve: {
        include: ['taro-mobile'],
      }
    }
  }
  if (process.env.NODE_ENV === 'development') {     // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  return merge({}, baseConfig, prodConfig)   // 生产构建配置（默认开启压缩混淆等）
})
