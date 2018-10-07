<template>
    <div class="app-container">
        <el-form ref="form" class="form" :model="form" label-width="80px">
            <el-form-item label="手机号">
                <el-input placeholder="请输入手机号"></el-input>
                <el-button type="primary" style="margin-top: 20px;">获取验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input placeholder="请输入新密码"></el-input>
            </el-form-item>
            <div class="btn-group">
                <el-button type="primary">提交</el-button>
                <el-button>返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'forgetPassword'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .form {
        width: 400px;
        margin: 30px auto;
        .btn-group {
            text-align: center;
            button {
                padding: 12px 40px;
            }
        }
    }
}    
</style>
