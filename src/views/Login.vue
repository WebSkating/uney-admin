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
                            <span class="time">{{count}}s</span>
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
    import axios from 'axios';
    import * as types from "../static/js/types.js";
    import store from '../store'
    export default {
        name: 'login',
        data() {
            return {
                phonenum: '',
                password: '',
                vcode: '',
                errorInfo: '用户名或密码错误',
                showErrorInfo: false,
                messsageStatus: true,
                timer: null, //定时器对象
                count: '' //获取验证码后用户等待秒数
            }
        },
        created: function () {
            if (localStorage.token && localStorage.token != undefined) {
                this.$store.commit(types.LOGIN, {
                    token: localStorage.token,
                    sessionId: localStorage.session
                });
                let self = this;
                console.log('refreshToken begin!');
                setTimeout(function () {
                    self.$axios.post('/auth/refreshToken.json').then(result => {
                        console.log('refreshToken...');
                        if (result) {
                            console.log(result.data);
                            console.log("token: " + result.data.data.token);
                            console.log("sessionId: " + result.data.data.sessionId);
                            self.$store.commit(types.LOGIN, {
                                token: result.data.data.token,
                                sessionId: result.data.data.sessionId
                            });
                            console.log('refreshToken over!');
                        }
                    });
                }, 200);
                this.$router.replace('/home');
            } else {
                this.$store.commit(types.LOGOUT);
            }
        },
        mounted() {

        },
        methods: {
            //验证码
            smsCode() {
                var reg = /^1[23456789]\d{9}$/;
                if (this.phonenum === '') {
                    this.errorInfo = '请输入手机号码';
                    this.showErrorInfo = true;
                } else if (!reg.test(this.phonenum)) {
                    this.errorInfo = '手机号码格式不正确';
                    this.showErrorInfo = true;
                    //console.log(this.phonenum)
                } else {
                    let that = this;

                    const TIME_COUNT = 60; //设置60秒获取一次
                    //如果计时器对象不存在
                    if (!that.timer) {
                        that.count = TIME_COUNT;
                        //如果localStorage中存在timecount说明用户刷新了页面 继续保持读秒
                        // if(localStorage.timecount){
                        //   that.count = localStorage.timecount;
                        // }
                        that.messsageStatus = false; //倒计时信息
                        that.timer = setInterval(() => {
                            if (that.count > 0 && that.count <= TIME_COUNT) {
                                that.count--; //每次运行 秒数减少 倒计时效果
                                // localStorage.timecount = that.count;
                            } else {
                                that.messsageStatus = true; //文字为 获取验证码
                                // localStorage.removeItem('timecount');
                                clearInterval(that.timer); //清除定时器
                                that.timer = null; //清除定时器对象
                            }
                        }, 1000);
                    }
                    /* 发送手机验证码方法 */
                    axios({
                        method: "POST",
                        url: "/auth/smsValidate.json",
                        params: {
                            mobile: that.phonenum
                        }
                    }).then(function (result) {
                        console.log(result.data);
                    })
                }
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
                axios({
                    method: "POST",
                    url: "/auth/login.json",
                    params: {
                        mobile: this.phonenum,
                        password: this.$md5(this.password),
                        type: "1",
                        verifyCode: this.vcode
                    }
                }).then(result => {
                    if (result.data.errorCode == 0) {
                        this.$store.commit(types.LOGIN, result.data.data);
                        this.$router.push('/home');
                    } else {
                        this.errorInfo = result.data.errorInfo;
                        this.showErrorInfo = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .container-wrap {
        min-width: 1180px;
        height: 100%;
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