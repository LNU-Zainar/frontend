<template>
  <div class="list">
    <ListForm :form-model="formModel" @submit="onSearch"/>
    <div class="list-main">
      <template v-if="listLoading">
        <ListItem v-for="i in 5" :key="i" :is-skeleton="true"/>
      </template>
      <template v-else-if="lostItems.length">
        <ListItem v-for="(item, index) in lostItems" :key="index" :item="item" @click="handleItemClick(item)"/>
      </template>
      <el-empty v-else description="暂无物品招领信息"></el-empty>
    </div>

    <div class="list-pagination">
      <el-pagination
        :page-sizes="[10, 20, 40, 60, 80]"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListForm from '@/components/ListForm'
import ListItem from '@/components/ListItem'
import * as api from '@/common/api'

export default {
  name: '',
  components: {
    ListForm,
    ListItem
  },
  data () {
    const query = this.$route.query
    
    return {
      formModel: {
        keyword: undefined,
        location: query.location,
        category: undefined,
        date: []
      },
      dialogVisible: false,
      listLoading: true,
      lostItems: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  mounted () {
    this.$watch(() => {
      return this.currentPage + ',' + this.pageSize
    }, this.fetchListItems, {
      immediate: true
    })
  },
  methods: {
    handleItemClick (item) {
      this.$router.push({
        name: 'post',
        params: {
          id: item.id
        }
      })
    },
    fetchListItems () {
      this.listLoading = true
      const fm = this.formModel
      const date = fm.date
      const startDate = date[0] ? date[0].getTime() : undefined
      const endDate = date[1] ? date[1].getTime() : undefined
      api.getItems({
        keyword: fm.keyword,
        location_id: fm.location,
        category_id: fm.category,
        start_date: startDate,
        end_date: endDate,
        page_size: this.pageSize,
        cur_page: this.currentPage
      }, {
        notifyType: 'f'
      }).then(data => {
        this.total = data.total
        this.lostItems = data.list
      }).finally(() => {
        this.listLoading = false
      })
    },
    onSearch () {
      console.log(this.formModel)
      this.fetchListItems()
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
