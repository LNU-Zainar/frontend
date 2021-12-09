<template>
  <div :class="['images-wall', 'has-' + images.length]">
    <div class="cell" v-for="(img, index) in images" :key="index">
      <el-image
        class="img"
        :src="img" 
        :preview-src-list="images">
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  margin: 10px 0;
  width: 100%;
}
</style>