<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="账号">
                <el-input placeholder="请输入账号" v-model="searchForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input placeholder="请输入账号" v-model="searchForm.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请输入账号" v-model="searchForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select clearable placeholder="请选择角色" v-model="searchForm.auth_id">
                    <el-option v-for="(item, index) in rolesList" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择状态" v-model="searchForm.status">
                    <el-option value="1" label="启用"></el-option>
                    <el-option value="0" label="停用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-plus" @click="addAccount">添加账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="账号" prop="username"></el-table-column>
            <el-table-column label="姓名" prop="realname"></el-table-column>
            <el-table-column label="手机号码" prop="phone"></el-table-column>
            <el-table-column label="角色" prop="auth_name"></el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.status == 1 ? '启用' : '停用' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="title">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="editAccount(scope.row)">编辑</el-button>
                    <el-button type="success" size="small" @click="changeStatus(scope.row)">启用</el-button>
                    <el-button type="primary" size="small" @click="setBianmin(scope.row.id)">分配边民</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper">
        </el-pagination>

        <el-dialog :title=" isEdit ? '编辑账号': '添加账号' " width="25%" :visible.sync="editAccountFlag">
            <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="!isEdit">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="ruleForm.realname"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="auth_id">
                    <el-radio v-for="(item, index) in rolesList" :key="index"  v-model="ruleForm.auth_id" :label="item.id">{{ item.name }}</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitData">确 定</el-button>
                <el-button @click="editAccountFlag = false">取 消</el-button> 
            </div>
        </el-dialog>

        <set-bianmin :setBianminFlag="setBianminFlag" @setBianminChange="setBianminChange" :editId="editId"></set-bianmin>
    </div>
</template>

<script>
import systemConfig from '@/api/systemConfig'
import setBianmin from './components/setBianmin'
export default {
    name: 'accountList',
    components: {
        setBianmin
    },
    data() {
        return {
            editId:0,
            editAccountFlag: false,
            setBianminFlag: false,
            isEdit: false,
            rolesList: [],
            dataList: [],
            searchForm: {
                page: 1,
                limit: 10,
                dataCount: 0,
            },
            ruleForm: {
                username: '',
                password: '',
                phone: '',
                realname: '',
                auth_id: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                realname: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                auth_id: [
                    { required: true, message: '请选择角色', trigger: 'change' },
                ],
            }
        }
    },
    created() {
        systemConfig.getAuth().then(res => {
            if(res.code == 200) {
                this.rolesList = res.data.list
            }
        })
        this.getDataList()
    },
    methods: {
        getDataList() {
            systemConfig.getUsersList(this.searchForm).then(res => {
                if(res.code == 200) {
                    this.dataList = res.data.list
                    this.searchForm.dataCount = res.data.dataCount
                }
            })
        },
        handleCurrentChange(value) {
            this.searchForm.page = value
            this.getDataList()
        },
        addAccount() {
            this.editAccountFlag = true
            if(this.$refs.ruleForm) {
                this.$refs.ruleForm.clearValidate()
            }
            this.ruleForm = {}
            this.isEdit = false
        },
        editAccount(data) {
            this.editAccountFlag = true
            if(this.$refs.ruleForm) {
                this.$refs.ruleForm.clearValidate()
            }
            this.ruleForm = {
                username: data.username,
                phone: data.phone,
                realname: data.realname,
                id: data.id,
                auth_id: data.auth_id
            }
            
            this.isEdit = true
        },
        changeStatus(data) {
            if(data.status == 1) {
                this.$confirm(`确定停用姓名为${data.realname}的账号？`, '提示', {
                    confirmButtonText: '确定停用',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    systemConfig.updateDataUser( { id: data.id, status: 0 }).then(res => {
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '停用成功!'
                            })
                            this.getDataList()
                        }
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    })        
                })
            } else {
                this.$confirm(`确定启用姓名为${data.realname}的账号？`, '提示', {
                    confirmButtonText: '确定启用',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    systemConfig.updateDataUser( { id: data.id, status: 1 }).then(res => {
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '停用成功!'
                            })
                            this.getDataList()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    })       
                })
            }
        },

        setBianmin(id) {
            this.editId = id
            this.setBianminFlag = true
        },
        
        setBianminChange(value) {
            this.setBianminFlag = value
            this.getDataList()
        },

        searchData() {
            this.getDataList()
        },
       
        submitData() {
            if(this.isEdit) {
                systemConfig.updateDataUser(this.ruleForm).then(res => {
                    if(res.code == 200) {
                        this.$message.success('编辑成功！')
                        this.getDataList()
                    }
                })   
            } else { 
                systemConfig.addUser(this.ruleForm).then(res => {
                    if(res.code == 200) {
                        this.$message.success('添加成功！')
                        this.getDataList()
                    }
                }) 
            }    
            this.editAccountFlag = false
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {}
</style>
