import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import router from '@/router/index'
import { setupStore } from '@/store'
import App from './App.vue'
import { logCamCardBrand } from '@/utils/log'
import '@/styles/index.less'
import 'ant-design-vue/es/message/style'
import 'ant-design-vue/es/notification/style'

import 'virtual:windi-base.css' // 该文件会影响antdesign的基础样式，小心使用
import 'virtual:windi-components.css'
// // windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// // windicss devtools support (dev only)
import 'virtual:windi-devtools' // 允许在浏览器调试器中调试css，防止无用的css被移除。该模块在生产环境下会被自动移除，无需特殊处理

const app = createApp(App)

const i18n = createI18n({
  locale: navigator.language || 'zh-CN',
  messages
})

logCamCardBrand()
setupStore(app)

app.use(i18n).use(router).mount('#app')
