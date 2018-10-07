<template>
    <div class="login-container">
        <!-- <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h3 class="title">vue-element-admin</h3>
        <el-form-item prop="username">
            <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
            </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
        </el-form-item>
        <el-form-item prop="password">
            <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
            placeholder="password"></el-input>
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
            Sign in
            </el-button>
        </el-form-item>
        </el-form> -->
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <h4>管理员账户登录</h4>
            <el-form-item prop="username" class="username">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入帐号" />
            </el-form-item>
            <el-form-item prop="password" class="password">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="password" />
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye" />
                </span>
            </el-form-item>
            <el-form-item>
                <el-col :span="12" class="keep-password">
                    <el-checkbox v-model="keepPassword">记住密码</el-checkbox>
                </el-col>
                <el-col :span="12" class="forget-password">
                    <p>忘记密码？</p>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="introduce">
            <h3>边民资料管理系统</h3>
            <p>一款安全、简单、实用的资料平台</p>
        </div>
        <p class="footer">Copyright © 晶品科技 All rights Resered</p>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import Cookies from 'js-cookie'
import {Base64} from 'js-base64'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      keepPassword: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(Cookies.get('username') && Cookies.get('password')) {
        this.loginForm.username = Base64.decode(Cookies.get('username'))
        this.loginForm.password = Base64.decode(Cookies.get('password'))
        this.keepPassword = true
      } else {
        this.loginForm.username = ''
        this.loginForm.password = ''
      }
    })
    
  },
  watch: {
    keepPassword(value){
      if(!value) {
        Cookies.remove('username', this.loginForm.username)
        Cookies.remove('password', this.loginForm.password) 
      }
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((data) => {
            if(this.keepPassword) {
              Cookies.set('username', Base64.encode(this.loginForm.username), { expires: 7 })
              Cookies.set('password', Base64.encode(this.loginForm.password), { expires: 7 })
            }
            this.loading = false
            if(data && data.userInfo.login_count == 1) {
              this.$router.push({ name: 'firstLogin' })
            } else {
              this.$router.push({ name: 'bianMinInfo' })  
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../../styles/login.scss";
.login-container {
    position: relative;
    .introduce {
        position: absolute;
        left: 470px;
        top: 250px;
        color: #fff;
        h3 { font-size: 30px; margin: 0; font-weight: 400; }
        p { font-size: 12px; }
    }
    .footer {
        width: 100%;
        color: #fff;
        position: absolute;
        bottom: 20px;
        text-align: center;
    }
}    
</style>
