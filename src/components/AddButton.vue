<template>
  <div class="add-button" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <el-button type="primary" :circle="!isHover" icon="iconfont icon-plus" @click="onAddClick">
      <span v-if="isHover">发布</span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isHover: false
    }
  },
  methods: {
    onAddClick () {
      this.$router.push({
        path: '/add'
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.add-button {
  position: fixed;
  right: 50px;
  bottom: 50px;
  button {
    box-shadow: 3px 3px 10px rgba(0,0,0, .3);
  }
}
</style>
