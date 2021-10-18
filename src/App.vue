<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
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
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()

    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })

    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  max-width: $wrapWidth;
  margin: 30px auto;
}
</style>
