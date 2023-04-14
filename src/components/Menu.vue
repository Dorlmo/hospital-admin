<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#FFFFFF"
      router
      :default-active="$route.path"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item index="/patientInfo">
        <el-icon><UserFilled /></el-icon>
        <span>住院信息</span>
      </el-menu-item>
      <el-menu-item index="/medicineInfo">
        <el-icon><Menu /></el-icon>
        <span>处方信息</span>
      </el-menu-item>
      <el-menu-item index="/checkInfo">
        <el-icon><Histogram /></el-icon>
        <span>检查情况</span>
      </el-menu-item>
      <el-menu-item index="/dischargeInfo">
        <el-icon><HelpFilled /></el-icon>
        <span>出院信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>

</style>
