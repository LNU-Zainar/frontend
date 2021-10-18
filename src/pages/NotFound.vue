<template>
  <div class="not-found">
    <h1>
      <i class="iconfont icon-sad"></i>
      抱歉，找不到页面。
    </h1>
    <p class="description">
      <span>
        请检查您访问的地址是否正确，或者
      </span>
      <el-link type="primary" href="/">
        返回首页
      </el-link>。
    </p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found {
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  .iconfont {
    font-size: inherit;
  }
  .description {
    font-size: 14px;
    > span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
