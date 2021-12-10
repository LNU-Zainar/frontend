<template>
  <div class="post-item" v-if="!isSkeleton" @click="$emit('click', item, $event)">
    <div class="item-left">
      <el-image
        class="thumbnail"
        :src="thumbnail"
        fit="cover"></el-image>
    </div>
    <div class="item-center">
      <div class="item-header">
        <el-tag effect="plain" size="small" class="item-category" v-if="item.category_name">
          {{ item.category_name }}
        </el-tag>
        <item class="item-title">
          {{ item.title }}
        </item>
      </div>
      <div class="item-description">
        {{ item.description }}
      </div>
      <div class="item-footer">
        <span class="item-location">
          <i class="iconfont icon-location"></i>
          {{ item.location_name }}
        </span>
        <span class="item-time">
          {{ item.update_date }}
        </span>
      </div>
      <div>
        
      </div>
    </div>
    <div class="item-right" @click.stop v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
  <el-skeleton :loading="true" animated v-else>
    <div slot="template" class="post-item is-skeleton">
      <div class="item-left">
        <el-skeleton-item variant="image" class="thumbnail"/>
      </div>
      <div class="item-center">
        <el-skeleton-item variant="p" style="height: 20px; margin: 6px 0; width: 50%" />
        <el-skeleton-item variant="text" style="margin-top: 20px;" />
        <el-skeleton-item variant="text" style="width: 100px; margin-top: 20px;" />
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.post-item {
  max-width: 100%;
  display: flex;
  border: 1px solid transparent;
  border-bottom-color: #e5e5e5;
  margin-top: -1px;
  padding: 15px;
  transition: box-shadow .2s;

  &:not(.is-skeleton):hover {
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border: 1px solid #ddd !important;
  }
}
.post-item:not(.is-skeleton):last-child {
  border-bottom-color: transparent;
}
.item-left {
  margin-right: 20px;
  font-size: 0;
  line-height: 1;
}
.item-center {
  flex: 1 1 auto;
  overflow: hidden;
}
.item-right {
  margin-left: 20px;
}
.item-header {
  display: flex;
  align-items: center;
}
.item-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-category {
  margin-right: 5px;
}
.item-description {
  margin: 12px 0;
  font-size: 14px;
  line-height: 1.8;
  min-height: 1.8em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  min-height: 1.2em;
}
.item-time {
  font-size: 14px;
  color: #909399;
}
.thumbnail {
  width: 180px;
  height: 110px;
}
</style>
