<template>
  <div
    class="toast-loading"
    v-loading="loading"
    element-loading-text="请稍后"
    element-loading-spinner="el-icon-loading">

  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.toast-loading {
  position: fixed !important;
  z-index: 9;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 150px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  border: 1px solid #b3d1ff;
  overflow: hidden;
  box-shadow: 0px 5px 9px rgba(0,0,0, .05);
  ::v-deep .el-loading-mask {
    position: static;
    background: #e6f0ff;
  }
  ::v-deep .el-loading-text {
    margin-left: .5em;
    display: inline;
  }
  ::v-deep .el-loading-spinner {
    position: static;
    margin-top: 0;
  }
}
</style>