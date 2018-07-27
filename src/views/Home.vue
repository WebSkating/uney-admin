<template>
  <div>
    <el-header>
      <div class="innerHeader ovh">
        <a href="javascript:;" @click="toHome">
          <img src="../assets/logo.png" alt="">
          <h1>UNEY</h1>
        </a>
        <h2 class="admin-name">孙闯</h2>
        <h2 class="permission">管理员 : </h2>
      </div>
    </el-header>
    <el-container>
      <el-main class="mt20">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="订单管理" name="first">
            <el-row class="mt20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-input class="ufl search" placeholder="请输入订单号" prefix-icon="el-icon-search" v-model="searchOfOrderID" clearable>
                  </el-input>
                  <!-- <el-button class="ml20 ufl" icon="el-icon-search" circle></el-button> -->
                  <el-button type="primary ml20 ufl">搜索</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-table class="mt20" :data="tableData" style="width: 100%" align="left" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="date" label="订单号" sortable>
              </el-table-column>
              <el-table-column prop="name" label="买方">
              </el-table-column>
              <el-table-column prop="address" label="卖方">
              </el-table-column>
              <el-table-column prop="address" label="买方手机">
              </el-table-column>
              <el-table-column prop="address" label="卖方手机">
              </el-table-column>
              <el-table-column prop="address" label="当前状态">
              </el-table-column>
              <el-table-column prop="address" label="放币时间">
              </el-table-column>
              <el-table-column prop="address" label="币种">
              </el-table-column>
              <el-table-column prop="address" label="单量" sortable>
              </el-table-column>
              <el-table-column prop="address" label="总值" sortable :formatter="formatter">
              </el-table-column>
              <el-table-column prop="address" label="操作">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="我的处理" name="second">

            <el-table :data="tableData" style="width: 100%" align="left" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="date" label="订单号" sortable>
              </el-table-column>
              <el-table-column prop="name" label="初始状态">
              </el-table-column>
              <el-table-column prop="address" label="当前状态">
              </el-table-column>
              <el-table-column prop="address" label="结果">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        searchOfOrderID: '',
        activeName: 'first',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区'
        }]
      }
    },
    methods: {
      toHome() {
        this.$router.replace('/home');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>

<style scoped>
  .ovh {
    overflow: hidden;
  }

  .container {
    overflow: hidden;
    width: 1180px;
  }

  .el-container {
    width: 1180px;
  }

  .innerHeader {
    width: 1180px;
  }

  .innerHeader a {
    display: block;
    overflow: hidden;
    width:120px;
    height:100%;
    float: left;
  }

  .el-header {
    background-color: #409EFF;
    overflow: hidden;
  }

  .el-header img {
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .admin-name {
    font-size: 14px;
    color: #FFFFFF;
    float: right;
    height: 20px;
    line-height: 20px;
    margin: 20px 0;
  }

  .permission {
    font-size: 14px;
    color: #FFFFFF;
    float: right;
    height: 20px;
    line-height: 20px;
    margin: 20px 10px;
  }

  .el-header h1 {
    height: 20px;
    line-height: 20px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    margin: 20px 10px;
  }

  .el-main {
    background-color: #FFFFFF;
  }
  .search{
    width:300px;
  }
</style>