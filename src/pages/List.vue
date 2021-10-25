<template>
  <div class="list">
    <ListForm/>
    <div class="list-main">
      <ListItem v-for="(item, index) in lostItems" :key="index" :item="item" @click.native="handleItemClick(item)"/>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="50%">
      <el-page-header slot="title" @back="handleBack" content="帖子详情"></el-page-header>
      <PostDetail :id="displayedPost"/>
    </el-dialog>

    <div class="list-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListForm from '@/components/ListForm'
import ListItem from '@/components/ListItem'
import PostDetail from '@/components/PostDetail'

export default {
  name: '',
  components: {
    ListForm,
    ListItem,
    PostDetail
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (value) {
        if (value === 'post') {
          this.dialogVisible = true
          this.fetchItemData()
        }
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      displayedPost: null,
      lostItems: [
        {
          title: '校园卡',
          category: '校园卡',
          location: '图书馆',
          pickTime: '2021-10-03',
          images: [
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
          ]
        },
        {
          title: '藏青色雨伞',
          category: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          images: [
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
          ]
        },
        {
          title: '藏青色雨伞',
          category: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          images: [
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
          ]
        },
        {
          title: '藏青色雨伞',
          category: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          images: [
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
          ]
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    handleBack () {
      this.dialogVisible = false
      this.$router.go(-1)
    },
    handleItemClick (item) {
      this.displayedPost = item
      this.dialogVisible = true
      this.$router.push({
        name: 'post',
        params: {
          id: 20
        }
      })
    },
    fetchItemData () {
      console.log('fetch item data')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  margin: 10px 0;
}
.list-pagination {
  margin: 20px 0;
}
</style>
