<template>
    <div class="app-container">
        <el-form :rules="rules" ref="ruleForm" class="form" :model="formData" label-width="80px">
            <el-form-item label="账号名">
                <el-input v-model="formData.userName" placeholder="请输入账号名" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.realName" placeholder="请输入姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="telphone">
                <el-input v-model="formData.telphone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="formData.oldPassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="formData.newPassword" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="formData.checkPassword" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item class="submit">
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getAuthKey, getUserInfo } from '@/utils/auth'
import { firstLogin, setInfo } from '@/api/login'
export default {
    name: 'accountManage',
    data() {
        const validate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return {
            formData: {
                userName: getUserInfo().username,
                realName: getUserInfo().realname,
                telphone: getUserInfo().phone,
                oldPassword: '',
                newPassword: '',
                checkPassword: '',
            },
            rules: {
                telphone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                checkPassword: [
                    { required: true, validator: validate, trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        submit() {
            const submitData = {
                old_pwd: this.formData.oldPassword,
                new_pwd: this.formData.newPassword,
                check_pwd: this.formData.checkPassword,
                phone: this.formData.telphone,
                auth_key: getAuthKey()
            }
            setInfo(submitData).then(res => {
                if(res.code == 200) {
                    this.$store.dispatch('LogOut').then(() => {
                        this.$message.success('修改成功，请重新登录！')
                        setTimeout(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        },500)
                    })
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .form {
        width: 400px;
        margin: 30px auto;
        .submit {
            button { 
                padding: 12px 80px; 
                margin-top: 30px;
                margin-left: 20px;
            }
        }
    }
}    
</style>
