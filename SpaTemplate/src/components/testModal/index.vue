<template>
  <div>
    <div class="text-center text-pink-500">testModal {{ test }}</div>
    <div class="text-center text-red-600">{{ book.title }}</div>
    <div class="text-center text-yellow-500">{{ userLocal }}-{{ userRegion.color }}</div>
    <div class="text-center mt-5">
      <a-button type="primary" class="inline-block" @click="updateLocalInject"
        >子组件注入按钮</a-button
      >
    </div>
  </div>
</template>
<script lang="ts">
  import type { SetupContext } from 'vue'
  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    },
    setup(props: Readonly<any>, { attrs, slots, emit, expose }: SetupContext) {
      const { title } = toRefs<Readonly<any>>(props)
      const book = reactive({ title: 'Vue 3 Guide' })
      const test = ref<string>('setup生成')
      const counter = ref<number>(0)
      const reCounter = computed(() => test.value + 'case')

      const userLocal = inject('local')
      const userRegion = inject('region')
      const updateLocalInject = inject('updateLocalInject')

      const getCount = () => {
        test.value = `${title.value}${test.value}`
      }
      const setCount = () => {
        counter.value = counter.value + 2
      }
      onMounted(getCount)
      // watch(counter, getCount)
      console.group(attrs, slots, emit, expose)
      expose({
        setCount
      })
      return {
        test,
        counter,
        reCounter,
        book,
        userLocal,
        userRegion,
        updateLocalInject
      }
    }
  }
</script>
