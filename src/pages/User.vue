<template>
  <div class="user">
    <el-tabs :tab-position="tabPosition" type="border-card">
      <el-tab-pane label="个人信息">
        <el-form class="user-form" ref="form" :model="form" label-width="80px" size="medium">
          <div class="user-form-cont">
            <div class="user-form-left">
              <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>

              <el-form-item label="手机">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>

              <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item label="补充描述">
                <el-input type="textarea" v-model="form.desc" rows="5"></el-input>
              </el-form-item>
            </div>

            <div class="user-form-right">
              <el-form-item label="头像">
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
            </div>

            <div class="user-form-bottom">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发布管理">
        <ListItem v-for="(item, index) in lostItems" :key="index" :item="item">
          <div class="user-post-actions">
            <el-button size="mini" type="default" icon="el-icon-edit">编辑</el-button>
            <br>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </div>
        </ListItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ListItem from '@/components/ListItem'

export default {
  components: {
    ListItem
  },
  data() {
    return {
      tabPosition: 'left',
      form: {
        nickname: '',
        mobile: '',
        email: '',
        desc: ''
      },
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
      ]
    };
  },
  methods: {
    onSubmit () {
      //
    },
    onCancel () {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .el-tabs {
    display: flex;
    align-items: stretch;
    min-height: 300px;
  }
  ::v-deep .el-tabs__header {
    height: auto;
    flex: 0;
  }
  ::v-deep .el-tabs__content {
    flex: 1;
  }
  .el-tab-pane {
    padding: 50px 0;
  }
  &-form {
    max-width: 700px;
    margin: 0 auto;
    &-cont {
      display: flex;
      flex-wrap: wrap;
      // border-left: 2px solid #E4E7ED;
    }
    &-left {
      flex: 1 1 100px;
    }
    &-right {
      flex: 0 1 200px;
    }
    &-bottom {
      flex: 1 0 100%;
    }
  }
  &-post-actions {
    display: flex;
    flex-direction: column;
  }
}
</style>