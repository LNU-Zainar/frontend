<template>
  <div class="posts-filter-form">
    <el-form ref="form" :model="form" size="mini">

      <el-row>
        <el-col :span="8">
          <el-form-item label="标题" label-width="40px">
            <el-input v-model="form.name" placeholder="请输入关键字"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到地点" label-width="80px">
            <el-select v-model="form.location" placeholder="请选择活动区域">
              <el-option v-for="item in locationOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        
        <el-col :span="8">
          <el-form-item label="物品分类" label-width="80px">
            <el-select v-model="form.category" placeholder="请选择活动区域">
              <el-option v-for="item in categoryOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="时间" label-width="40px">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8" style="text-align: right;">
          <el-form-item label-width="10px">
            <el-button plain>重置</el-button>
            <el-button type="primary" plain icon="el-icon-search" @click="onSearch">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      form: {
        name: '',
        location: '',
        category: '',
        date: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      locationOptions: [
        { label: '全部', value: '' },
        { label: '图书馆', value: '0' },
        { label: '鹏园', value: '1' }
      ],
      categoryOptions: [
        { label: '全部', value: '' },
        { label: '校园卡', value: '0' },
        { label: '雨伞', value: '1' }
      ]
    }
  },
  methods: {
    onSearch() {
      console.log('search!');
    }
  }
}
</script>

<style lang="scss" scoped>
.posts-filter-form {
  padding: 0 10px;
}
.el-select {
  width: 100%;
}
.el-date-editor--daterange.el-input__inner {
  width: 100%;
}
</style>