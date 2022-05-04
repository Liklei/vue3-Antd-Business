/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv {
  readonly VITE_GLOB_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_PORT: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_GLOB_API_URL: string
  readonly VITE_GLOB_UPLOAD_URL: string
  readonly VITE_BUILD_COMPRESS: boolean
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_USE_IMAGEMIN: boolean
  readonly VITE_LEGACY: boolean
  readonly VITE_GLOB_APP_LOGO: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_INFO__: string

declare const __INTLIFY_PROD_DEVTOOLS__: boolean

declare module '*.vue' {
  import type * as Vue from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: Vue.DefineComponent<{}, {}, any>
  export default component
}
