<template>
  <div class="home-layout">
    <el-card class="home-box-card">
      <template #header>
        <div class="card-header">
          <span>你好，admin!</span>
        </div>
      </template>
      
    </el-card>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.home-box-card{
  width: 25%;
  height: 30%;
}

.home-layout{
  height: 100%;
  display: flex;
  background: url('@/assets/image/background2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

</style>
