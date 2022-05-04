<template>
  <div ref="root" class="mt-5 text-center text-purple-700"
    >This is a root element {{ rootProps }}{{ rectName }}</div
  >
</template>
<script lang="ts">
  import { isProxy, isReactive } from 'vue'
  export default {
    setup() {
      const step = 1
      const root = ref(null)
      const name = ref('lance')
      const age = ref('29')
      const foo = {}
      const toos = markRaw({})
      const rootProps = reactive({ name, age })

      const original = reactive({ count: 0 })
      const copy = readonly(original)

      console.log(rootProps.name)
      console.log(rootProps.age)

      onMounted(() => {
        // DOM 元素将在初始渲染后分配给 ref
        console.log(root.value)

        console.log(isProxy(rootProps))
        console.log(isProxy(step))

        console.log(toRaw(foo))
        console.log(isReactive(reactive(toos)))
      })

      watchEffect(
        () => {
          // 这个副作用在 DOM 更新之前运行，因此，模板引用还没有持有对元素的引用。
          console.log(root.value) // => null
          console.log(copy.count)
        },
        { flush: 'post' }
      )

      return {
        root,
        rootProps
      }
    }
  }
</script>
