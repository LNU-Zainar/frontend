<template>
  <div id="app">
    <Header v-if="!$route.meta.hideHeader"/>
    <router-view class="router-view"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      value: true
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  max-width: $wrapWidth;
  margin: 30px auto;
}
</style>
