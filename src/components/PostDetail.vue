<template>
  <div class="post-detail">
    <el-descriptions title="校园卡">
      <el-descriptions-item label="物品分类">
        <el-tag size="small">
          {{ post.category }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="捡到地点">
        {{ post.location }}
      </el-descriptions-item>
      <el-descriptions-item label="捡到时间">
        {{ post.pickTime }}
      </el-descriptions-item>
      <el-descriptions-item label="补充描述" :span="3">
        {{ post.description }}
      </el-descriptions-item>
  </el-descriptions>

  <el-image v-for="url in post.images" :key="url" :src="url" lazy></el-image>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      post: {
        name: '校园卡',
        category: '校园卡',
        location: '图书馆',
        pickTime: '2021-10-03',
        description: '请丢失物品的同学，在19:00-22:00期间与我联系。',
        images: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
