import { defineConfig } from 'windicss/helpers'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
  darkMode: 'class',
  transformCSS: 'pre',
  // :class时能被识别到
  safelist: [range(3).map((i) => `p-${i}`), range(10).map((i) => `mt-${i}`)],
  // 添加属性前缀
  attributify: {
    prefix: 'w:'
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        svg: { 'vertical-align': 'initial' } // 解决ant-design-vue图标不对齐的问题
      })
    }
  ],
  theme: {
    extend: {}
  }
})
