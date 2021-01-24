<template>
  <div>
    <CryptocurrencyPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CryptocurrencyPage from '@/components/CryprocurrencyPage.vue'

@Component({
  components: {
    CryptocurrencyPage
  },
})
export default class App extends Vue {}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
