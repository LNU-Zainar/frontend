<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Header v-if="!$route.meta.hideHeader"/>
    <router-view class="router-view"></router-view>
    <Footer/>
    <AddButton v-if="!$route.meta.hideAddButton"/>

    <el-dialog
      title="帖子详情"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="50%">
      <el-page-header slot="title" @back="handleBack" content="帖子详情">
        <div>关闭</div>
      </el-page-header>
      <PostDetail/>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddButton from '@/components/AddButton'
import PostDetail from '@/components/PostDetail'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    AddButton,
    PostDetail
  },
  computed: {
    dialogVisible () {
      return this.$route.name === 'post' || this.$route.name === 'user-post'
    }
  },
  methods: {
    handleBack () {
      let parentRoute = null
      this.$route.matched.some(route => {
        if (route.name === this.$route.name) {
          return true
        } else {
          parentRoute = route
        }
      })
      this.$router.replace(parentRoute)
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
