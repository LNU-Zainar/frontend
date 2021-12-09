<template>
  <div v-loading="isLoading">
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="物品分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择物品分类">
              <el-option v-for="item in categoryOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到地点" prop="location">
            <el-select v-model="form.location" placeholder="请选择捡到地点">
              <el-option v-for="item in locationOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到时间" prop="date">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="详细描述" prop="description">
        <el-input type="textarea" v-model="form.description" rows="5"></el-input>
      </el-form-item>

      <el-form-item label="上传图片" prop="pictures">
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

        <el-upload
          class="uploader"
          action="#"
          list-type="picture-card"
          :limit="limit"
          accept=".jpg,.jpeg,.png"
          :http-request="httpRequest"
          :on-success="onUploadSuccess"
          :on-remove="handleRemove"
          :on-error="onUploadError"
          :on-preview="handlePictureCardPreview"
          :on-exceed="handleExceed"
          :file-list="form.picturesList">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isSubmitting">
          {{ isEdit ? '保存' : '发布' }}
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/common/api'
import { upload } from '@/common/cos'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isLoading: false,
      isSubmitting: false,
      dialogImageUrl: '',
      dialogVisible: false,
      limit: 9,
      locationOptions: [],
      categoryOptions: [],
      form: {
        title: '',
        category: '',
        location: '',
        date: '',
        description: '',
        phone: '',
        picturesList: []
      },
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        location: [
          { required: true, message: '请选择地点', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    isEdit () {
      return this.$route.name === 'edit'
    },
    id () {
      return this.$route.params.id
    },
    imageUrls: {
      get () {
        return this.form.picturesList.map(item => item.url)
      },
      set (urls) {
        urls = urls || []
        this.form.picturesList = urls.map(url => ({
          name: '',
          url,
        }))
      }
    }
  },
  watch: {
    isEdit: {
      immediate: true,
      handler (isEdit) {
        if (isEdit) {
          this.fetchItem()
        }
      }
    }
  },
  mounted () {
    this.fetchFormConfigs()
    if (!this.isEdit) {
      if (this.user.phone) {
        this.form.phone = this.user.phone
      }
    }
  },
  methods: {
    fetchFormConfigs () {
      api.getCategory(null, {
        notifyType: 'f'
      }).then(data => {
        data.forEach(item => {
          this.categoryOptions.push({
            label: item.category_name,
            value: item.id
          })
        })
      })
      api.getLocation(null, {
        notifyType: 'f'
      }).then(data => {
        data.forEach(item => {
          this.locationOptions.push({
            label: item.location_name,
            value: item.id
          })
        })
      })
    },
    fetchItem () {
      this.isLoading = true
      api.getItem(null, {
        notifyType: 'f',
        pathParams: {
          id: this.id
        }
      }).then(data => {
        console.log('fetch', data)
        this.imageUrls = data.images
        Object.assign(this.form, {
          title: data.title,
          category: data.category_id,
          location: data.location_id,
          date: data.pickup_time,
          description: data.description,
          phone: data.phone
        })
      }).finally(() => {
        this.isLoading = false
      })
    },
    validateForm (callback) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    onUploadSuccess (url, file) {
      this.form.picturesList.push({
        name: file.name,
        url
      })
    },
    onUploadError () {
      this.$message.error('上传图片失败')
    },
    handleRemove(file) {
      const index = this.form.picturesList.find(item => item.url === file.url)
      if (index !== -1) {
        this.form.picturesList.splice(index, 1)
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    httpRequest: upload,
    handleExceed() {
      this.$message.warning(`文件超过${this.limit}个`)
    },
    onSubmit () {
      this.validateForm(() => {
        this.isSubmitting = true
        if (this.isEdit) {
          api.putItem({
            title: this.form.title,
            location_id: this.form.location,
            category_id: this.form.category,
            pickup_time: this.form.date,
            description: this.form.description,
            phone: this.form.phone,
            images: this.imageUrls
          }, {
            pathParams: {
              id: this.id
            }
          }).then(data => {
            console.log(data)
            this.$router.push({
              name: 'user'
            })
          }).finally(() => {
            this.isSubmitting = false
          })
        } else {
          api.postItem({
            title: this.form.title,
            location_id: this.form.location,
            category_id: this.form.category,
            pickup_time: this.form.date,
            description: this.form.description,
            phone: this.form.phone,
            images: this.imageUrls
          }).then(data => {
            console.log('post success', data)
            this.$router.push({
              name: 'index'
            })
          })
          .finally(() => {
            this.isSubmitting = false
          })
        }
      })
    },
    onCancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  ::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    object-fit: cover;
  }
}
</style>