<template>
  <div class="post-detail">
    <template v-if="!isLoading">
      <el-descriptions>
        <h1 slot="title">
          {{ post.title }}
        </h1>

        <el-descriptions-item label="捡到地点">
          {{ post.location_name }}
        </el-descriptions-item>

        <el-descriptions-item label="物品分类">
          <el-tag size="small" effect="plain">
            {{ post.category_name }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="捡到时间">
          {{ post.update_date }}
        </el-descriptions-item>

        <el-descriptions-item label="发布用户">
          {{ post.poster.nickname }}
        </el-descriptions-item>

        <el-descriptions-item label="联系电话">
          {{ post.phone }}
        </el-descriptions-item>

        <el-descriptions-item label="邮箱地址">
          {{ post.poster.email }}
        </el-descriptions-item>
      </el-descriptions>

      <p>
        {{ post.description }}
      </p>

      <ImagesWall :images="post.images"/>

    </template>
    <el-skeleton v-else :loading="true" animated>
      <div slot="template">
          <el-skeleton-item variant="p" style="width: 250px; height: 32px; margin: 30px 0;" />
          
          <div
            style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0;">
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
          </div>

          <div
            style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0;">
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
            <el-skeleton-item variant="text" style="width: 20%;" />
          </div>

          <el-skeleton-item variant="text" style="margin-top: 10px;" />
          <el-skeleton-item variant="text"/>
          <el-skeleton-item variant="text" style="width: 30%;" />

        <el-skeleton-item variant="image" style="margin-top: 20px; width: 100%; height: 300px;"/>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import * as api from '@/common/api'
import ImagesWall from '@/components/ImagesWall'

export default {
  name: '',
  components: {
    ImagesWall
  },
  data () {
    return { 
      isLoading: false,
      post: {
        poster: {}
      }
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
.poster {
  margin-top: -3px;
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 10px;
  }
}
</style>
