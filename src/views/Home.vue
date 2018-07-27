<template>
  <div>
    <el-header>
      <div class="innerHeader ovh">
        <a href="javascript:;" class="logo-wrap" @click="toHome">
          <img src="../assets/logo.png" alt="">
          <h1>UNEY</h1>
        </a>
        <a href="javascript:;" class="logout" @click="logout">
          注销
        </a>
        <h2 class="admin-name" v-if="false">孙闯</h2>
        <h2 class="permission" v-if="false">管理员 : </h2>
      </div>
    </el-header>
    <el-container>
      <el-main class="mt20">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="订单管理" name="first">
            <el-row class="mt20">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-input class="ufl search" placeholder="请输入完整订单号" prefix-icon="el-icon-search" v-model="orderID" clearable v-on:keyup.13="searchOrderID">
                  </el-input>
                  <!-- <el-button class="ml20 ufl" icon="el-icon-search" circle></el-button> -->
                  <el-button type="primary ml20 ufl" @click="searchOrderID">搜索</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-table class="mt20" :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column align="left" header-align="center" prop="id" label="订单号" sortable>
              </el-table-column>
              <el-table-column align="left" header-align="center" prop="toUserName" label="买方">
              </el-table-column>
              <el-table-column align="left" header-align="center" prop="fromUserName" label="卖方">
              </el-table-column>
              <el-table-column align="left" header-align="center" prop="toUserMobile" label="买方手机">
              </el-table-column>
              <el-table-column align="left" header-align="center" prop="fromUserMobile" label="卖方手机">
              </el-table-column>
              <el-table-column align="center" prop="statusStr" label="当前状态" width="80">
              </el-table-column>
              <el-table-column align="center" prop="deliveryTime" label="放币时间" width="160">
              </el-table-column>
              <el-table-column align="center" prop="symbol" label="币种" width="80">
              </el-table-column>
              <el-table-column align="center" prop="count" label="单量" sortable>
              </el-table-column>
              <el-table-column align="center" prop="currencyCount" label="总值" sortable>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button @click="suodan(scope.row)" type="text" size="small">锁单</el-button>
                  <el-button @click="weifukuan(scope.row)" type="text" size="small">未付款</el-button>
                  <el-button @click="yifukuan(scope.row)" type="text" size="small">已付款</el-button>
                  <el-button @click="suocang(scope.row)" type="text" size="small">锁仓</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="我的处理" name="second">

            <el-table :data="tableData" style="width: 100%" align="left" :default-sort="{prop: 'date', order: 'descending'}">
              <el-table-column prop="id" label="订单号" sortable>
              </el-table-column>
              <el-table-column prop="beforeStatus" label="初始状态">
              </el-table-column>
              <el-table-column prop="currentStatus" label="当前状态">
              </el-table-column>
              <el-table-column prop="result" label="结果">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import store from '../store.js';
  import * as types from '../static/js/types.js';
  export default {
    name: 'home',
    data() {
      return {
        orderID: '',
        activeName: 'first',
        tableData: [],
        errorInfo: ''
      }
    },
    methods: {
      suodan(tab, event) {
        console.log(tab, event);
        this.$confirm('确认锁单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '锁单成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      weifukuan(tab, event) {
        console.log(tab, event);
        this.$confirm('将修改订单状态为未付款，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      yifukuan(tab, event) {
        console.log(tab, event);
        this.$confirm('将修改订单状态为已付款，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      suocang(tab, event) {
        console.log(tab, event);
        this.$confirm('确认锁仓?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '锁仓成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      searchOrderID() {
        if (this.orderID) {
          this.$axios({
            url: '/order/getOrderById.json',
            method: 'POST',
            params: {
              orderId: this.orderID
            }
          }).then(result => {
            console.log(result.data);
            if (result.data.errorCode === '0') {
              if (this.tableData.length > 0) {
                for (let prop in result.data.data) {
                  this.$set(this.tableData[0], prop, result.data.data[prop]);
                }
              } else {
                this.tableData.push(result.data.data);
              }

              console.log(this.tableData);
            } else {
              this.errorInfo = result.data.errorInfo;
            }

          });
        } else {
          this.errorInfo = '请输入完整订单ID';
        }
      },
      logout() {
        this.$axios({
          url: '/auth/logout.json',
          method: 'POST',
          params: {}
        }).then(result => {
          console.log(result.data);
          //store的操作
          this.$store.commit(types.LOGOUT);
          this.$router.replace('/');
        });
      },
      toHome() {
        this.$router.replace('/home');
      },
      handleClick() {}
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

  .logo-wrap {
    display: block;
    overflow: hidden;
    width: 120px;
    height: 100%;
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

  .search {
    width: 300px;
  }

  .logout {
    height: 20px;
    line-height: 20px;
    color: #FFFFFF;
    font-size: 14px;
    float: right;
    margin: 20px 10px;
  }
</style>