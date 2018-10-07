<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item>
                <el-button type="primary" class="el-icon-plus">添加节点</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="节点结构" prop="p_title"></el-table-column>
            <el-table-column label="显示名" prop="title"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作" prop="title">
                <template slot-scope="scope">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import systemConfig from '@/api/systemConfig'
export default {
    name: 'ruleSetting',
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            systemConfig.getRuleSettingList().then(res => {
                if(res.code == 200) {
                    this.dataList = res.data
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {}
</style>
