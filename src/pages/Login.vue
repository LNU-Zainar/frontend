<template>
  <div class="login">
    <header class="header">
      <a href="/" class="logo">Zainar</a>
    </header>
    <main class="main">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form ref="loginForm" :model="loginForm" label-width="70px">
            <el-form-item label="账号">
              <el-input v-model="loginForm.account"></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onLogin">登录</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="signup">
          <el-form ref="signupForm" :model="signupForm" label-width="70px">
            <el-form-item label="账号">
              <el-input v-model="signupForm.account"></el-input>
            </el-form-item>

            <el-form-item label="密码">
              <el-input type="password" v-model="signupForm.password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码">
              <el-input type="password" v-model="signupForm.password2"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary">注册</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      activeType: 'login',
      loginForm: {
        account: '',
        password: ''
      },
      signupForm: {
        account: '',
        password: '',
        password2: ''
      }
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
    onLogin () {
      this.$message({
        message: '登录成功',
        type: 'success'
      });
      this.$store.commit('setUser', {
        id: 1,
        nickname: 'Simon'
      })
      this.$router.push({
        path: '/'
      })
    },
    onCancel () {
      this.$router.push({
        name: 'index'
      })
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
</style>
