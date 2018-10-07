<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="边民ID">
                <el-input placeholder="请输入边民ID" v-model="searchForm.bm_id"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input placeholder="请输入身份证" v-model="searchForm.identity_num"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input placeholder="请输入手机号" v-model="searchForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input placeholder="请输入地址" v-model="searchForm.address"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-col :span="11">
                    <el-input placeholder="请输入年龄最小值" v-model="searchForm.age_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入年龄最大值" v-model="searchForm.age_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="性别">
                <el-select clearable placeholder="请选择" v-model="searchForm.sex">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="录入时间">
                <el-date-picker v-model="searchForm.create_time" value-format="timestamp" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
                <el-button type="primary" class="el-icon-plus" @click="addBianMin">添加边民</el-button>
                <!-- <el-button type="primary" class="el-icon-plus">批量导入</el-button> -->
            </el-form-item>
             
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="边民ID" prop="bm_id"></el-table-column>
            <el-table-column label="身份证" prop="identity_num"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="年龄" prop="age"></el-table-column>
            <el-table-column label="性别" prop="sex">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex==1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="账户数量" prop="accounts_count"></el-table-column>
            <el-table-column label="录入时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="title" width="350px">
                <template slot-scope="scope">
                    <el-button size="small" @click="checkDetail(scope.row.id)">查看</el-button>
                    <el-button type="primary" size="small" @click="editBianMin(scope.row.id)">编辑</el-button>
                    <el-button type="warning" size="small" @click="addAccount">添加账号</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

        <add-account-detail :visibleAddAccountFlag="visibleAddAccountFlag" @changeFlag="changeFlag" :isEdit="isEdit" :editData="editData"></add-account-detail>
    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
import addAccountDetail from './components/addAccountDetail'
export default {
    name: 'bianMinInfo',
    components: {
        addAccountDetail
    },
    data() {
        return {
            visibleAddAccountFlag: false,
            isEdit: false,
            editData: null,
            dataList: [],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 0,
                bm_id: '',
                identity_num: '',
                name: '',
                phone: '',
                address: '',
                age_gt: '',
                age_lt: '',
                sex: '',
                create_time: '',
                create_time_lt: '',
                create_time_gt: ''
            }
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            bianMinManage.getBianMin(this.searchForm).then(res => {
                if(res.code == 200) {
                    this.dataList = res.data.list
                    this.searchForm.dataCount = res.data.dataCount
                }
            })
        },
        addAccount() {
            this.visibleAddAccountFlag = true
            this.isEdit = false
            this.editData = null
        },
        changeFlag(value) {
            this.visibleAddAccountFlag = value
        },
        addBianMin() {
            this.$router.push({ name: 'addBianMinInfo' })
        },
        editBianMin(id) {
            this.$router.push({ name: 'addBianMinInfo', params: { id: id } })
        },
        handleCurrentChange(value) {
            this.searchForm.page = value
            this.getDataList()
        },
        searchData() {
            try {
                if(this.searchForm.create_time != '') {
                    this.searchForm.create_time_gt = parseInt(this.searchForm.create_time[0])/1000
                    this.searchForm.create_time_lt = parseInt(this.searchForm.create_time[1])/1000
                }
            } catch (error) {
                
            }
            this.getDataList()
            
        },
        checkDetail(id) {
            this.$router.push({ name: 'bianMinInfoDetail', query: { id: id } })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .line {
        text-align: center;
    }
}
</style>
