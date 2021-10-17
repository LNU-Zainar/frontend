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
      :show-close="false"
      width="50%">
      <el-page-header slot="title" @back="handleBack" content="详情页面"></el-page-header>
      <span>这是一段信息</span>
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
 
export default {
  name: '',
  components: {
    ListForm,
    ListItem
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
      lostItems: [
        {
          name: '校园卡',
          location: '图书馆',
          pickTime: '2021-10-03',
          thumbnail: 'https://via.placeholder.com/200x100'
        },
        {
          name: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          thumbnail: 'https://via.placeholder.com/200x100'
        },
        {
          name: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          thumbnail: 'https://via.placeholder.com/200x100'
        },
        {
          name: '雨伞',
          location: '鹏园',
          pickTime: '2021-10-04',
          thumbnail: 'https://via.placeholder.com/200x100'
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
    handleItemClick () {
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
