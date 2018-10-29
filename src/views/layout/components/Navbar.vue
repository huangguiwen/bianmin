<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <!-- <breadcrumb></breadcrumb> -->
        <!-- <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <span>{{ userInfo.realname }}</span>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>主页</el-dropdown-item>
                </router-link>
                <div @click="logout">
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </div>
            </el-dropdown-menu>
        </el-dropdown> -->
        <div class="top-bar">
            <!-- <span class="el-icon-message">(321)</span> -->
            <!-- <span @click="gotoAccountManage">{{ userInfo.realname }}</span> -->
            <el-button type="primary" size="mini" @click="logout" class="logout">退出</el-button>
        </div>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUserInfo } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
      return {
          userInfo: {}
      }
  },
  created() {
    this.userInfo = getUserInfo()
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$message.success('退出成功！')
        setTimeout(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        },500)
      })
    },
    gotoAccountManage() {
        this.$router.push({name: 'accountManage'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 0 0 20px;
    }
    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }
    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;
        cursor: pointer;
    }
    .top-bar {
        text-align: right;
        span {
            cursor: pointer;
            &:nth-of-type(2) {
                padding: 0 8px;  
            }
        }
        .el-icon-message {
            &::before {
                font-size: 24px;
                vertical-align: middle;
            }
            
        }
        .logout {
            margin-right: 30px;
        }
    }
}
</style>

