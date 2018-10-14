<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="账号">
                <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select clearable placeholder="请选择角色">
                    <el-option value="1" label="公司管理员"></el-option>
                    <el-option value="2" label="普通管理员"></el-option>
                    <el-option value="3" label="考勤管理员"></el-option>
                    <el-option value="4" label="行政人员"></el-option>
                    <el-option value="5" label="公司领导"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择状态">
                    <el-option value="1" label="启用"></el-option>
                    <el-option value="2" label="信用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-plus" @click="addAccount">添加账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="账号" prop="username"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="手机号码" prop="name"></el-table-column>
            <el-table-column label="角色" prop="status"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作" prop="title">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="editAccount">编辑</el-button>
                    <el-button type="success" size="small" @click="startUse">启用</el-button>
                    <el-button type="danger" size="small" @click="remove">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageList.page" :page-size="pageList.limit" 
            :total="pageList.dataCount" layout="total, prev, pager, next, jumper">
        </el-pagination>

        <el-dialog :title=" isEdit ? '编辑账号': '添加账号' " width="25%" :visible.sync="editAccountFlag">
            <el-form label-width="80px">
                <el-form-item label="账号">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-checkbox>系统管理员</el-checkbox>
                    <el-checkbox>运营管理员</el-checkbox>
                    <el-checkbox v-if="isEdit">财务员</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editAccountFlag = false">确 定</el-button>
                <el-button @click="editAccountFlag = false">取 消</el-button> 
            </div>
        </el-dialog>
    </div>
</template>

<script>
import systemConfig from '@/api/systemConfig'
export default {
    name: 'accountList',
    data() {
        return {
            editAccountFlag: false,
            isEdit: false,
            dataList: [{}],
            pageList: {
                page: 1,
                limit: 10,
                dataCount: 0
            }
        }
    },
    created() {
        // this.getDataList()
    },
    methods: {
        getDataList() {
            systemConfig.getUsersList(this.pageList).then(res => {
                if(res.code == 200) {
                    this.dataList = res.data.list
                    this.pageList.dataCount = res.data.dataCount
                }
            })
        },
        handleCurrentChange(value) {
            this.pageList.page = value
            this.getDataList()
        },
        addAccount() {
            this.editAccountFlag = true
            this.isEdit = false
        },
        editAccount() {
            this.editAccountFlag = true
            this.isEdit = true
        },
        startUse() {
            this.$confirm('删除后不可撤销,确认删除 姓名为“李大喜”的账号？', '提示', {
                confirmButtonText: '确定信用',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        remove() {
            this.$confirm('确定停用姓名为“陈琳”的账号', '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {}
</style>
