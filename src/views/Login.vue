<template>
    <div class="container-wrap">
        <div class="container">
            <div class="logo-wrap">
                <img src="../assets/logo.png" alt="">
                <h1>UNEY</h1>
            </div>
            <div class="login-wrap">
                <div class="innerRow mt30">
                    <label for="">手机号</label>
                    <input type="text">
                </div>
                <div class="innerRow">
                    <label for="">密码</label>
                    <input type="text">
                </div>
                <div class="innerRow">
                    <label for="">手机验证码</label>
                    <input type="text">
                </div>
                <a href="javascript:;" class="loginBtn mt30" @click="login">登录</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        methods: {
            login() {
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>
    .container-wrap {
        width:100%;
        height:100%;
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
        padding: 20px 20px;
        overflow: hidden;
    }

    .innerRow label,
    .innerRow input {
        float: left;
    }

    .innerRow label {
        width: 120px;
        text-align: right;
        color: #606266;
        font-size: 20px;
    }

    .innerRow input {
        width: 200px;
        height: 30px;
        border: 1px solid #E4E7ED;
        border-radius: 5px;
        margin-left: 20px;
        padding-left: 10px;
    }

    .loginBtn {
        display: inline-block;
        width: 200px;
        height: 50px;
        font-size: 24px;
        color: #FFFFFF;
        background: #409EFF;
        border-radius: 25px;
        line-height: 24px;
        padding: 13px 0;
    }
</style>