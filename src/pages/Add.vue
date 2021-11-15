<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <el-form-item label="物品分类">
            <el-select v-model="form.category" placeholder="请选择物品分类">
              <el-option label="校园卡" value="card"></el-option>
              <el-option label="雨伞" value="umbrella"></el-option>
              <el-option label="其它" value="other"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到地点">
            <el-select v-model="form.location" placeholder="请选择捡到地点">
              <el-option label="图书馆" value="lib"></el-option>
              <el-option label="鹏园" value="pengyuan"></el-option>
              <el-option label="其它" value="other"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="捡到时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="补充描述">
        <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
      </el-form-item>

      <el-form-item label="上传图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          category: '',
          location: '',
          date: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onCancel () {
        this.$router.go(-1)
      },
      handlePictureCardPreview () {

      },
      handleDownload () {
        
      },
      handleRemove () {
        
      }
    }
  }
</script>