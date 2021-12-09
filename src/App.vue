<template>
  <div id="app" :class="'page-' + $route.name">
    <vue-progress-bar></vue-progress-bar>
    <Header v-if="!$route.meta.hideHeader"/>
    <router-view class="router-view"></router-view>
    <Footer/>
    <AddButton v-if="!$route.meta.hideAddButton"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddButton from '@/components/AddButton'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    AddButton
  }
}
</script>

<style lang="scss" scoped>
.router-view {
  max-width: $wrapWidth;
  margin: 30px auto;
}
.page-map {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 10px;
    pointer-events: none;
    color: rgba(255,255,255, .6);
    text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black,0 -1px 0 black
  }
}
</style>
