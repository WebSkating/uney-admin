<template>
  <div class="home">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="订单管理" name="first">订单管理</el-tab-pane>
    <el-tab-pane label="我的处理" name="second">我的处理</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
