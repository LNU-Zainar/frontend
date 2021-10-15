<template>
  <el-container>
    <el-header>
      <h1>{{ msg }}</h1>
    </el-header>
    <el-main>
      <img alt="Vue logo" src="../assets/logo.png">
      <div>
        <el-link type="primary" href="https://element.eleme.cn/#/zh-CN/component/installation">Element UI官方文档</el-link>
        <br>
        <br>
        <el-switch
          v-model="value"
          active-text="按月付费"
          inactive-text="按年付费">
        </el-switch>
        <br>
        <br>
        <div v-if="value">
          <el-alert
            title="成功提示的文案"
            type="success">
          </el-alert>
          <el-alert
            title="消息提示的文案"
            type="info">
          </el-alert>
          <el-alert
            title="警告提示的文案"
            type="warning">
          </el-alert>
          <el-alert
            title="错误提示的文案"
            type="error">
          </el-alert>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      value: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
