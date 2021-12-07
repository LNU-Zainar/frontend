<template>
  <div class="post-item" v-if="!isSkeleton" @click="$emit('click', item, $event)">
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
          {{ item.location_id }}
        </span>
      </div>
      <div>
        {{ item.update_date }}
      </div>
    </div>
    <div class="item-right" @click.stop>
      <slot></slot>
    </div>
  </div>
  <el-skeleton :loading="true" animated v-else>
    <div slot="template" class="post-item is-skeleton">
      <div class="item-left">
        <el-skeleton-item variant="image" style="width: 200px; height: 100px;"/>
      </div>
      <div class="item-center">
        <el-skeleton-item variant="p" style="width: 50%" />
        <el-skeleton-item variant="text" style="margin-right: 16px;" />
        <el-skeleton-item variant="text" style="width: 30%; margin-top: 20px;" />
      </div>
    </div>
  </el-skeleton>
</template>

<script>
export default {
  name: '',
  props: {
    isSkeleton: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({

      })
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
  transition: all .3s;

  &:not(.is-skeleton):hover {
    cursor: pointer;
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
