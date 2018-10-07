<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="账号ID">
                <el-input placeholder="请输入账号ID"></el-input>
            </el-form-item>
            <el-form-item label="户名">
                <el-input placeholder="请输入户名"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input placeholder="请输入身份证"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
                <el-input placeholder="请输入开户行"></el-input>
            </el-form-item>
            <el-form-item label="余额">
                <el-col :span="11">
                    <el-input placeholder="请输入余额最小值"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入余额最大值"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="额度">
                <el-col :span="11">
                    <el-input placeholder="请输入额度最小值"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入额度最大值"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="类型">
                <el-select clearable placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="银联卡" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="3"></el-option>
                    <el-option label="Q码" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="停用" value="1"></el-option>
                    <el-option label="使用中" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="录入时间">
                <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" class="el-icon-search">搜索</el-button> -->
                <el-button type="primary" class="el-icon-plus" @click="addAccount">添加账户</el-button>
                <!-- <el-button type="primary" class="el-icon-plus">批量导入</el-button> -->
            </el-form-item>
             
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="账号ID" prop="zh_id"></el-table-column>
            <el-table-column label="户名" prop="name"></el-table-column>
            <el-table-column label="身份证" prop="identity_num"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="账号" prop="account"></el-table-column>
            <el-table-column label="初始余额" prop="balance">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.balance | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="开户行" prop="bank"></el-table-column>
            <el-table-column label="密码" prop="account_pwd"></el-table-column>
            <el-table-column label="收款码" prop="qr_code">
                <template slot-scope="scope">
                    <img v-show="scope.row.qr_code" :src="scope.row.qr_code" alt="" width="100" height="100">
                </template>
            </el-table-column>
            <el-table-column label="额度" prop="day_limit">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.day_limit | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="录入时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status==1 ? 'danger' : 'success'">{{ scope.row.status | accontStatus }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="editAccount(scope.row)">编辑</el-button>
                    <!-- <el-button type="warning" size="small">启用</el-button> -->
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
    name: 'bianMinAccount',
    components: {
        addAccountDetail
    },
    data() {
        return {
            visibleAddAccountFlag: false,
            dataList: [],
            isEdit: false,
            editData: null,
            searchForm: {
                page: 1,
                limit: 10,
                dataCount: 0
            },
        }
    },
    created() {
        this.getDataList()
    },
    filters: {
        accounType(value) {
            switch(value) {
                case 1: 
                    return '银联卡'
                case 2: 
                    return '支付宝'
                case 3: 
                    return '微信'
                case 4: 
                    return 'Q码'
            }
        },
        accontStatus(value) {
            switch(value) {
                case 1: 
                    return '停用'
                case 2: 
                    return '使用中'
            }
        }
    },
    methods: {
        getDataList() {
            bianMinManage.getBianMinAccounts(this.searchForm).then(res => {
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
            this.visibleAddAccountFlag = true
            this.isEdit = false
            this.editData = null
        },
        editAccount(row) {
            this.visibleAddAccountFlag = true
            this.isEdit = true
            this.editData = row
            
        },
        changeFlag(value) {
            this.visibleAddAccountFlag = value
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
