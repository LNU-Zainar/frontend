<template>
  <div class="login">
    <header class="header">
      <a href="/" class="logo">Zainar</a>
    </header>
    <main class="main">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form ref="loginForm" :model="loginForm" label-width="80px"
          :rules="loginFormRules">
            <el-form-item label="账号" prop="account">
              <el-input v-model="loginForm.account"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="signup" lazy>
          <el-form ref="registerForm" :model="registerForm" label-width="80px" :rules="registerFormRules">
            <el-form-item label="账号" prop="account">
              <el-input v-model="registerForm.account"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="registerForm.password2"></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="captcha">
              <el-input class="captcha-input" type="input" v-model="registerForm.captcha"></el-input>
              
              <img class="captcha-img" :src="captchaUrl" @click="refreshCaptchaImg" alt="验证码" :style="lockSeconds ? {cursor: 'not-allowed'} : {}">

              <el-button class="refresh-btn" @click="refreshCaptchaImg" plain :disabled="lockSeconds > 0">
                <template v-if="lockSeconds">
                  {{lockSeconds}}s
                </template>
                <template v-else>
                换一张
                </template>
              </el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onRegister" :loading="registerLoading">注册</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: '',
  data () {
    return {
      activeType: 'login',
      loginLoading: false,
      registerLoading: false,
      loginForm: {
        account: '',
        password: ''
      },
      registerForm: {
        account: '',
        password: '',
        password2: '',
        captcha: ''
      },
      registerFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      lockSeconds: 0,
      uuid: uuidv4()
    }
  },
  computed: {
    captchaUrl () {
      return process.env.VUE_APP_SERVER_URL + '/auth/captcha.png?cur_id=' + this.uuid
    }
  },
  watch: {
    '$route.query.type': {
      immediate: true,
      handler (value) {
        this.activeType = value || 'login'
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.replace({
        query: {
          type: this.activeType
        }
      })
    },
    refreshCaptchaImg () {
      if (this.lockSeconds) return
      this.lockSeconds = 5
      const timer = setInterval(() => {
        if (this.lockSeconds === 0) {
          clearInterval(timer)
        } else {
          this.lockSeconds--
        }
      }, 1000)
      this.uuid = uuidv4()
    },
    onLogin () {
      this.validateForm('loginForm', () => {
        this.loginLoading = true
        this.$store.dispatch('login', {
          uid: this.loginForm.account,
          password: this.loginForm.password
        })
        .then(this.redirectToBack)
        .finally(() => {
          this.loginLoading = false
        })
      })
    },
    onRegister () {
      this.validateForm('registerForm', () => {
        this.registerLoading = true
        this.$store.dispatch('register', {
          uid: this.registerForm.account,
          password: this.registerForm.password,
          captcha: this.registerForm.captcha,
          cur_id: this.uuid
        })
        .then(this.redirectToBack)
        .finally(() => {
          this.registerLoading = false
        })
      })
    },
    onCancel () {
      this.$router.push({
        name: 'index'
      })
    },
    validateForm(refName, callback) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    redirectToBack () {
      const { from } = this.$route.query
      if (from) {
        this.$router.replace(decodeURIComponent(from))
      } else {
        this.$router.replace({
          name: 'index'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 80px 0;
  text-align: center;
}
.main {
  max-width: 400px;
  margin: 50px auto;
}
.logo {
  font-size: 28px;
  font-weight: bold;
  color: $primaryColor;
}
.captcha-img {
  display: inline-block;
  height: 40px;
  width: 110px;
  vertical-align: middle;
  margin: 0 5px;
  background: #eee;
  cursor: pointer;
}
.captcha-input {
  width: 110px;
}
.refresh-btn {
  width: 90px;
}
</style>
