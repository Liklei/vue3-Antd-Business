<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="login"
      sub-title="This is a subtitle"
      @back="() => null"
    />
    <div
      class="my-5 py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:(py-4 flex items-center space-y-0 space-x-6)"
    >
      <img
        class="block mx-auto h-24 rounded-full sm:(mx-0 flex-shrink-0)"
        :src="Logo"
        alt="Woman's Face"
      />
      <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">Erin Lindford</p>
          <p class="text-gray-500 font-medium">Product Engineer</p>
        </div>
        <button
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
          @click="showModal"
        >
          Message
        </button>
      </div>
    </div>
    <div class="text-center">
      <a-button type="primary" class="inline-block" @click="showModal">打开Modal</a-button>
    </div>
    <a-modal :visible="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <div class="text-center mt-10">
      <a-button type="primary" class="inline-block" @click="updateLocalInject"
        >父组件注入按钮</a-button
      >
    </div>
    <div class="mt-5">
      <testModal title="测试模态窗口" />
      <testModalCase />
    </div>
  </div>
</template>
<route lang="yaml">
name: login
meta:
  layout: default
  title: '企业数字名片-登录'
</route>
<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFC
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import testModal from '@/components/testModal/index.vue'
  import testModalCase from '@/components/testModal/test.vue'
  import { useMessage } from '@/hooks/useMessage'
  const { createMessage } = useMessage()
  const visible = ref<boolean>(false)
  // const { proxy } = getCurrentInstance()

  const showModal = () => {
    visible.value = true
  }
  const handleOk = (e: MouseEvent) => {
    console.log(e)
    visible.value = false
  }
  const local = ref<string>('North Pole')
  const region = reactive({
    color: 'Yellows'
  })

  const updateLocalInject = () => {
    if (local.value === 'East Pole') {
      createMessage.info('已经注入过数据')
      return
    }
    local.value = 'East Pole'
  }

  provide('local', readonly(local))
  provide('region', readonly(region))
  provide('updateLocalInject', updateLocalInject)
</script>
