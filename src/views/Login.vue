<template>
    <div class="container-wrap" ref="cw">
        <div class="container">
            <div class="logo-wrap">
                <img src="../assets/logo.png" alt="">
                <h1>UNEY</h1>
            </div>
            <div class="login-wrap">
                <el-row class="innerRow mt30">
                    <el-col :span="6" class="label-wrap">
                        <label for="phonenum">手机号</label>
                    </el-col>
                    <el-col :span="12">
                        <input type="text" id="phonenum" v-model="phonenum" placeholder="请输入手机号码" autocomplete="off" v-on:keyup.13="login">
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                </el-row>
                <el-row class="innerRow">
                    <el-col :span="6" class="label-wrap">
                        <label for="password">密码</label>
                    </el-col>
                    <el-col :span="12">
                        <input id="password" v-model="password" placeholder="请输入密码" type="password" autocomplete="new-password" v-on:keyup.13="login">
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                </el-row>
                <el-row class="innerRow">
                    <el-col :span="6" class="label-wrap">
                        <label for="vcode">手机验证码</label>
                    </el-col>
                    <el-col :span="12">
                        <input id="vcode" v-model="vcode" placeholder="短信验证码" auto-complete="off" maxlength="6" v-on:keyup.13="login">
                    </el-col>
                    <el-col :span="6" class="send-message-wrap">
                        <el-button type="primary" icon="el-icon-message" v-if="messsageStatus" class="ml15" @click="smsCode"></el-button>
                        <el-button type="info" v-else class="ml15" disabled>
                            <span class="time">59s</span>
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col class="h40" :span="12">
                        <el-alert v-show="showErrorInfo" @close="errorInfoClose" :title="errorInfo" type="error"></el-alert>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <a href="javascript:;" class="loginBtn mt10" @click="login">登录</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                phonenum: '',
                password: '',
                vcode: '',
                errorInfo: '用户名或密码错误',
                showErrorInfo: false,
                messsageStatus: true
            }
        },
        mounted() {
            
        },
        methods: {
            smsCode() {
                this.messsageStatus = false;
            },
            errorInfoClose() {
                this.showErrorInfo = false;
                console.log(this.showErrorInfo);
            },
            login() {
                var reg = /^1[23456789]\d{9}$/;
                if (this.phonenum === '') {
                    this.errorInfo = '请输入手机号码';
                    this.showErrorInfo = true;
                    return;
                }
                if (!reg.test(this.phonenum)) {
                    this.errorInfo = '手机号码格式不正确';
                    this.showErrorInfo = true;
                    return;
                }
                if (this.password === '') {
                    this.errorInfo = '请输入密码';
                    this.showErrorInfo = true;
                    return;
                }
                if (this.vcode === '') {
                    this.errorInfo = '请输入短信验证码';
                    this.showErrorInfo = true;
                    return;
                }
                // if (!reg.test(this.phonenum)) {
                //     this.errorInfo = '短信验证码不正确';
                //     return;
                // }
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .container-wrap {
        min-width: 1180px;
        height:100%;
        min-height: 900px;
        background-color: #409EFF;
    }

    .container {
        overflow: hidden;
        width: 1180px;
    }

    .logo-wrap {
        width: 500px;
        margin-top: 100px;
    }

    .logo-wrap h1 {
        color: #FFFFFF;
        font-size: 24px;
    }

    .login-wrap {
        width: 500px;
        height: 400px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 10px;
        margin-top: 30px;
    }

    .innerRow {
        padding: 15px 20px;
        overflow: hidden;
    }

    .label-wrap {
        text-align: right;
    }

    .label-wrap label {
        margin-right: 15px;
    }

    .innerRow label {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: right;
        color: #606266;
        font-size: 16px;
    }

    .innerRow input {
        width: 100%;
        height: 40px;
        border: 1px solid #E4E7ED;
        background-color: #FFFFFF;
        border-radius: 5px;
        padding-left: 10px;
    }

    .loginBtn {
        display: inline-block;
        width: 200px;
        height: 50px;
        font-size: 20px;
        color: #FFFFFF;
        background: #409EFF;
        border-radius: 25px;
        line-height: 24px;
        padding: 13px 0;
    }

    .h40 {
        height: 40px;
    }

    .send-message-wrap {
        text-align: left;
    }

    .time {
        width: 23px;
        display: inline-block;
        font-size: 13px;
    }
</style>