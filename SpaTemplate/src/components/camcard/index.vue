<template>
  <div class="main">
    <h1>{{ msg }}</h1>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>
    <a-button class="my-5" type="primary" @click="count++">count is: {{ count }}</a-button>
    <p> Edit<code>components/camcard.vue</code> to test hot module replacement. </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ msg: string }>()
  const count = ref(0)
</script>

<style scoped lang="less">
  .main {
    a {
      color: #42b983;
    }

    label {
      margin: 0 0.5em;
      font-weight: bold;
    }

    code {
      background-color: #eee;
      padding: 2px 4px;
      border-radius: 4px;
      color: #304455;
    }
  }
</style>
