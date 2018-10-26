<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-plus" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="角色描述" prop="note"></el-table-column>
            <el-table-column label="操作" prop="title">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="editRole(scope.row.id)">编辑</el-button>
                    <!-- <el-button type="success" size="small">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper">
        </el-pagination>

        <add-role :addRoleFlag="addRoleFlag" @addMenuChange="addMenuChange"></add-role>
        <edit-role :editRoleFlag="editRoleFlag" @editMenuChange="editMenuChange" :editId="editId"></edit-role>
    </div>
</template>

<script>
import addRole from './components/addRole'
import editRole from './components/editRole'
import systemConfig from 'api/systemConfig'
export default {
    name: 'menuManage',
    components: {
        addRole,
        editRole
    },
    data() {
        return {
            editId: 0,
            addRoleFlag: false,
            editRoleFlag: false,
            dataList: [{

            }],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 1
            }
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            systemConfig.getAuth().then(res => {
                if(res.code == 200) {
                    this.dataList = res.data.list
                }
            })
        },
        handleCurrentChange(value) {
            this.searchForm.page = value
        },
        addRole() {
            this.addRoleFlag = true
        },
        editRole(id) {
            this.editId = id
            this.editRoleFlag = true
        },
        addMenuChange(value) {
            this.addRoleFlag = value
            this.getDataList()
        },
        editMenuChange(value) {
            this.editRoleFlag = value
            this.getDataList()
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    
}
</style>
