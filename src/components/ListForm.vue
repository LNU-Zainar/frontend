<template>
  <div class="posts-filter-form">
    <el-form ref="form" :model="formModel" size="small">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题" label-width="40px" prop="keyword">
            <el-input v-model="formModel.keyword" placeholder="请输入关键字"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到地点" label-width="80px" prop="location">
            <el-select v-model="formModel.location" placeholder="请选择捡到地点">
              <el-option v-for="item in locationOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        
        <el-col :span="8">
          <el-form-item label="物品分类" label-width="80px" prop="category">
            <el-select v-model="formModel.category" placeholder="请选择物品分类">
              <el-option v-for="item in categoryOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="时间" label-width="40px" prop="date">
            <el-date-picker
              v-model="formModel.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" style="text-align: right;">
          <el-form-item label-width="10px">
            <el-button plain @click="resetForm">重置</el-button>
            <el-button type="primary" plain icon="el-icon-search" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
import * as api from '@/common/api'

export default {
  name: '',
  props: {
    formModel: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      locationOptions: [
        { label: '全部', value: undefined }
      ],
      categoryOptions: [
        { label: '全部', value: undefined }
      ]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    onSearch() {
      this.$emit('submit')
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.onSearch()
    },
    fetchData () {
      api.getCategory(null, {
        notifyType: 'f'
      }).then(data => {
        data.forEach(item => {
          this.locationOptions.push({
            label: item.category_name,
            value: item.id
          })
        })
      })
      api.getLocation(null, {
        notifyType: 'f'
      }).then(data => {
        data.forEach(item => {
          this.categoryOptions.push({
            label: item.location_name,
            value: item.id
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.posts-filter-form {
  padding: 20px 15px 0;
  border: 1px solid #d3d4d6;
  background: #f4f4f5;
  border-radius: 5px;
}
.el-select {
  width: 100%;
}
.el-date-editor--daterange.el-input__inner {
  width: 100%;
}
</style>