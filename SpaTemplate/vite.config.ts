/* eslint-disable no-useless-escape */
import { resolve } from 'path'
import { ConfigEnv, UserConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import AutoImport from 'unplugin-auto-import/vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import WindiCSS from 'vite-plugin-windicss'
import ViteImages from 'vite-plugin-vue-images'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import CompressPlugin from 'vite-plugin-compression'
import Legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from 'vite-plugin-mock'
import EslintPlugin from 'vite-plugin-eslint'
import Visualizer from 'rollup-plugin-visualizer'

import pkg from './package.json'
import { pathResolve, readEnvConf, isProdFn } from './build'
import { OUTPUT_DIR, GLOB_CONFIG_FILE_NAME } from './build/constant'

const { name, version } = pkg

const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: new Date().toLocaleString()
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd() // 环境变量读取
  const viteEnv = readEnvConf(loadEnv(mode, root))
  const isBuild = command === 'build'

  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_APP_LOGO
  } = viteEnv

  const html_path = `${
    VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/` || '/'
  }${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /\@\//,
          replacement: pathResolve('src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /\#\//,
          replacement: pathResolve('types') + '/'
        }
      ],
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      port: VITE_PORT,
      open: false,
      cors: true
      // proxy: createProxy(VITE_PROXY), // .env文件加载proxy
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      manifest: true,
      sourcemap: !isProdFn(mode),
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      rollupOptions: {
        plugins: [Visualizer()]
        // output: { // 预留功能modules拆包
        //   manualChunks: configManualChunk
        // }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    plugins: [
      Vue(),
      VueJsx(),
      VueI18n({
        include: resolve(__dirname, './src/i18n/**'),
        runtimeOnly: false
      }),
      VueSetupExtend(),
      Pages({
        exclude: ['**/components/**/*.{vue,ts,js}', '**/composables/**/*.{vue,ts,js}'],
        nuxtStyle: true
      }),
      Layouts(),
      WindiCSS(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue\??/ // .vue
        ],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
        dts: 'types/components.d.ts'
      }),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => {
              return `ant-design-vue/es/${name}/style/index`
            }
          }
        ]
      }),
      ViteImages({
        dirs: ['src/assets/images']
      }),
      viteMockServe({
        // eslint-disable-next-line no-useless-escape
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: false,
        supportTs: true,
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';

        setupProdMockServer();
        `
      }),
      Legacy({
        targets: ['defaults', 'not IE 11']
      }),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: VITE_GLOB_APP_TITLE,
            logo: VITE_GLOB_APP_LOGO
          },
          tags: isBuild
            ? [
                {
                  tag: 'script',
                  attrs: {
                    src: html_path
                  }
                }
              ]
            : []
        }
      }),
      EslintPlugin(),
      CompressPlugin({
        ext: '.gz',
        deleteOriginFile: false
      }),
      splitVendorChunkPlugin(),
      Visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ]
  }
}
