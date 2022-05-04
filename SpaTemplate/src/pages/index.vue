<template>
  <!-- 推荐使用单元素包裹 -->
  <div class="text-center">
    <img
      class="mt-10"
      style="display: inline-block"
      alt="Vue logo"
      src="../assets/images/logo.png"
    />
    <camCard class="mt-5" :msg="t('welcome')" />
    <p class="font-bold px-8 mt-2">开发人员地址{{ address }}</p>
    <p class="mt-2"
      ><i class="iconfont icon-info"></i> {{ testModuleName }} - {{ testModuleCount }}</p
    >
    <a-button class="mt-2 mr-5" type="default" @click="handlerCount">VUEX 测试按钮</a-button>
    <a-button class="mt-5" type="default" @click="handlerDebounce">Lodash按钮</a-button>
    <a-affix class="mt-5" :offset-bottom="bottom">
      <a-button type="default">Affix bottom</a-button>
    </a-affix>
  </div>
</template>
<route lang="yaml">
name: home
meta:
  layout: default
  title: '企业数字名片'
</route>
<script lang="ts" setup>
  // This starter template is using Vue 3 <script setup> SFC
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import camCard from '@/components/camcard/index.vue'
  import { useAuthStoreWithOut } from '@/store/modules/auth'
  import { useI18n } from 'vue-i18n'
  import service from '@/services'
  import { useMessage } from '@/hooks/useMessage'

  const { createMessage } = useMessage()

  const { t } = useI18n()
  const bottom = ref(10)
  const store = useAuthStoreWithOut()
  const testModuleName = computed(() => store.getAuthNetWork)
  const testModuleCount = computed(() => store.roles)
  const state = reactive({
    address: '上海市静安区1988弄'
  })
  const handlerCount = async () => {
    store.setCount()
    const data: any = await service.Auth.getAuthData()
    console.log(data.data.data)
    state.address = data.data.data.address
  }
  const { address } = toRefs(state)
  const handlerDebounce = () => {
    createMessage.info('This is a normal message', 1000)
  }
</script>
