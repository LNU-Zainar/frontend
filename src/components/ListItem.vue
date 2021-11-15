<template>
  <div class="post-item">
    <div class="item-left">
      <el-image
        class="thumbnail"
        :src="thumbnail"
        fit="cover"></el-image>
    </div>
    <div class="item-center">
      <div class="item-title">
        {{ item.title }}
      </div>
      <div class="item-location">
        <span>
          <i class="iconfont icon-location"></i>
          {{ item.location }}
        </span>
      </div>
      <div>
        {{ item.pickTime }}
      </div>
    </div>
    <div class="item-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    thumbnail() {
      return this.item.images[0]
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.post-item {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    background: #f8f8f8;
  }
}
.post-item:last-child {
  border: 0;
}
.item-left {
  margin-right: 20px;
}
.item-center {
  flex: 1;
}
.item-title {
  font-size: 16px;
  font-weight: bold;
  line-height: 2;
}
.item-location {
  margin: 10px 0;
}
.thumbnail {
  width: 200px;
  height: 100px;
}
</style>
