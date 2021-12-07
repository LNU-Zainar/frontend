<template>
  <div class="post-detail">
    <template v-if="!isLoading">
      <el-descriptions :title="post.title">
        <el-descriptions-item label="物品分类">
          <el-tag size="small">
            {{ post.category_id }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="捡到地点">
          {{ post.location_id }}
        </el-descriptions-item>
        <el-descriptions-item label="捡到时间">
          {{ post.update_date }}
        </el-descriptions-item>
        <el-descriptions-item label="补充描述" :span="3">
          {{ post.description }}
        </el-descriptions-item>
      </el-descriptions>

      <el-image v-for="(url, index) in post.images || []" :key="index" :src="url" lazy></el-image>
    </template>
    <el-skeleton v-else :loading="true" animated>
      <div slot="template">
          <el-skeleton-item variant="p" style="width: 200px;" />
          
          <div
            style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0;">
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
          </div>

          <el-skeleton-item variant="text" style="margin-right: 16px;" />
          <el-skeleton-item variant="text" style="margin-right: 16px;" />
          <el-skeleton-item variant="text" style="width: 30%;" />

        <el-skeleton-item variant="image" style="margin-top: 20px; width: 100%; height: 300px;"/>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import * as api from '@/common/api'

export default {
  name: '',
  data () {
    return { 
      isLoading: false,
      post: {}
    }
  },
  watch: {
    '$route.params.id' (value) {
      if (value) {
        this.post = {}
        this.fetchItem()
      }
    }
  },
  mounted () {
    this.fetchItem()
  },
  methods: {
    fetchItem () {
      this.isLoading = true
      api.getItem(null, {
        notifyType: 'f',
        pathParams: {
          id: this.$route.params.id
        }
      }).then(data => {
        this.post = data
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
