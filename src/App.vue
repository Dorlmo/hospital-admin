<template>
  <template v-if="$route.path === '/login'">
    <router-view></router-view>
  </template>
  <template v-else>
    <div class="common-layout">
      <el-container>
        <el-header>东雪莲人民医院住院管理系统</el-header>
        <el-container>
          <el-aside width="200px">
            <AsideMenus></AsideMenus>
          </el-aside>
          <div class="router-view">
            <router-view class="pages"></router-view>
          </div>
        </el-container>
      </el-container></div
  ></template>
</template>

<script>
import AsideMenus from './components/Menu.vue'
export default {
  components: { AsideMenus },
  setup() {
    return {}
  }
}
</script>

<style scoped>
.common-layout {
  height: 100%;
}
.el-header {
  background-color: #00a5df;
  color: #ffffff;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 2px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.router-view {
  width: 100%;
  background: #f4f4f5;
}

.pages {
  padding: 10px 10px;
}
</style>
