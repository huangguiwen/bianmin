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
            <el-table-column label="角色名称" prop="username"></el-table-column>
            <el-table-column label="角色描述" prop="realname"></el-table-column>
            <el-table-column label="操作" prop="title">
                <template slot-scope="scope">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="success" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper">
        </el-pagination>

        <select-menu-permissions :menuFlag="menuFlag" @changeMenu="changeMenu"></select-menu-permissions>
    </div>
</template>

<script>
import selectMenuPermissions from './components/selectMenuPermissions'
export default {
    name: 'menuManage',
    components: {
        selectMenuPermissions
    },
    data() {
        return {
            menuFlag: false,
            dataList: [{

            }],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 1
            }
        }
    },
    methods: {
        handleCurrentChange(value) {
            this.searchForm.page = value
        },
        addRole() {
            this.menuFlag = true
        },
        changeMenu(value) {
            this.menuFlag = value
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    
}
</style>
