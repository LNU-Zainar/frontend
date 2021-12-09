<template>
  <div class="user">
    <el-tabs :tab-position="tabPosition" type="border-card" v-model="activeTab">
      <el-tab-pane label="个人信息" name="profile">
        <el-form class="user-form" ref="form" :model="form" :rules="formRules" label-width="80px" size="medium">
          <div class="user-form-cont">
            <div class="user-form-left">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>

              <el-form-item label="个人简介" prop="description">
                <el-input type="textarea" v-model="form.description" rows="5"></el-input>
              </el-form-item>
            </div>

            <div class="user-form-right">
              <el-form-item label="头像" prop="avatar">
                <el-avatar class="avatar" shape="square" :size="100" fit="cover" :src="form.avatar">
                  {{ avatarText }}
                </el-avatar>

                <el-progress class="progress" 
                :percentage="uploadProgress" :show-text="false"
                :style="{opacity: isUploading ? 1 : 0}"></el-progress>

                <el-upload
                  action="#"
                  accept=".jpg,.jpeg,.png"
                  :http-request="httpRequest"
                  :show-file-list="false"
                  :on-success="onUploadSuccess"
                  :on-error="onUploadError"
                  :on-progress="onUploadProgress"
                  :before-upload="beforeUpload">
                  <el-button plain  :disabled="isUploading">
                    修改头像
                  </el-button>
                </el-upload>
              </el-form-item>
            </div>

            <div class="user-form-bottom">
              <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="isSaving">保存</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="修改密码" name="password">
        <el-form class="user-form" ref="passwordForm" :model="passwordForm" :rules="passwordFormRules" label-width="80px" size="medium">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="passwordForm.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="passwordForm.password2"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onModifyPassword" :loading="isPasswordLoading">确认</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发布管理" name="posts">
        <template v-if="isListLoading">
        <ListItem v-for="i in 5" :key="i" :is-skeleton="true"/>
      </template>
        <template v-else-if="lostItems.length">
          <ListItem v-for="(item, index) in lostItems" :key="index" :item="item" @click="handleItemClick(item, $event)">
            <div class="user-post-actions">
              <el-button size="mini" type="default" icon="el-icon-edit" @click="handleItemEdit(item)">
                编辑
              </el-button>

              <el-popconfirm
                @confirm="handlePopConfirm(item)"
                title="您确定是否要删除该条发布信息？">
                <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">
                删除
              </el-button>
              </el-popconfirm>
            </div>
          </ListItem>
        </template>
        <el-empty v-else description="您没有发布过信息"></el-empty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ListItem from '@/components/ListItem'
import { upload } from '@/common/cos'
import * as api from '@/common/api'

export default {
  components: {
    ListItem
  },
  data() {
    const user = this.$store.state.user
    const tab = this.$route.query.tab || 'profile'
    return {
      activeTab: tab,
      tabPosition: 'left',
      isSaving: false,
      isListLoading: false,
      isPasswordLoading: false,
      isUploading: false,
      uploadProgress: 0,
      comfirmVisible: false,
      form: {
        nickname: user.nickname,
        phone: user.phone,
        email: user.email,
        description: user.description,
        avatar: user.avatar
      },
      formRules: {
        nickname: [
          { required: true, message: '请输入标题', trigger: 'blur' }
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
      }, 
      passwordForm: {},
      passwordFormRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
      },
      lostItems: []
    };
  },
  computed: {
    avatarText () {
      const nickname = this.$store.state.user.nickname
      return nickname ? nickname.slice(0, 3) : ''
    }
  },
  watch: {
    activeTab: {
      immediate: true,
      handler (value) {
        const queryTab = this.$route.query.tab
        if (queryTab !== value) {
          this.$router.replace({
            query: {
              tab: value
            }
          })
        }
        if (value === 'posts') {
          this.fetchPosts()
        }
      }
    }
  },
  methods: {
    fetchPosts () {
      this.isListLoading = true
      api.getUserItems(null, {
        notifyType: 'f'
      }).then(data => {
        this.lostItems = data.list
      })
      .finally(() => {
        this.isListLoading = false
      })
    },
    validateForm (refName, callback) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    onSubmit () {
      this.validateForm('form', () => {
        this.isSaving = true
        this.$store.dispatch('modifyUser', {
          nickname: this.form.nickname,
          phone: this.form.phone,
          email: this.form.email,
          description: this.form.description,
          avatar: this.form.avatar
        }).then(data => {
          console.log('post success', data)
        })
        .finally(() => {
          this.isSaving = false
        })
      })
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isLt2M) {
        this.isUploading = true
      } else {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onUploadSuccess (url) {
      this.form.avatar = url
      this.isUploading = false
      this.uploadProgress = 0
    },
    onUploadError () {
      this.isUploading = false
      this.uploadProgress = 0
    },
    onUploadProgress (evt) {
      this.uploadProgress = evt.percent
    },
    httpRequest: upload,
    handleItemClick (item) {
      this.$router.push({
        name: 'user-post',
        params: {
          id: item.id
        }
      })
    },
    handlePopConfirm (item) {
      api.deleteUserItem(null, {
        pathParams: {
          id: item.id
        }
      })
      .then(() => {
        const index = this.lostItems.indexOf(item)
        if (index > -1) {
          this.lostItems.splice(index, 1)
        }
      })
      .finally(() => {
        this.comfirmVisible = false
      })
    },
    handleItemEdit (item) {
      this.$router.push({
        name: 'edit',
        params: {
          id: item.id
        }
      })
    },
    onModifyPassword () {
      this.validateForm('passwordForm', () => {
        this.isPasswordLoading = true
        api.modifyPassword({
          old_password: this.passwordForm.oldPassword,
          password: this.passwordForm.password
        }).then(data => {
          console.log('modify password success', data)
        })
        .finally(() => {
          this.isPasswordLoading = false
        })
      })
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
      text-align: center;
    }
    &-bottom {
      flex: 1 0 100%;
    }
    .avatar {
      display: block;
      margin: auto;
      ::v-deep img {
        width: 100%;
      }
    }
    .progress {
      margin: 5px auto;
      width: 100px;
    }
  }
  &-post-actions {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    button {
      margin: 5px 0;
    }
  }
}
</style>
