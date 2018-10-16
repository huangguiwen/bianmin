<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="商户ID">
                <el-input placeholder="请输入商户ID" v-model="searchForm.sh_id"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input placeholder="请输入账号" v-model="searchForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input placeholder="请输入手机号" v-model="searchForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input placeholder="请输入商户名称" v-model="searchForm.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input placeholder="请输入联系人" v-model="searchForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input placeholder="请输入联系电话" v-model="searchForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input placeholder="请输入地址" v-model="searchForm.address"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-col :span="11">
                    <el-input placeholder="请输入账户余额最小值" v-model="searchForm.balance_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入账户余额最大值" v-model="searchForm.balance_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="历史提现">
                <el-col :span="11">
                    <el-input placeholder="请输入历史提现最小值" v-model="searchForm.deposit_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入历史提现最大值" v-model="searchForm.deposit_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="每天额度">
                <el-col :span="11">
                    <el-input placeholder="请输入每天额度最小值" v-model="searchForm.day_limit_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入每天额度最大值" v-model="searchForm.day_limit_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="已使用额度">
                <el-col :span="11">
                    <el-input placeholder="请输入已使用额度最小值" v-model="searchForm.used_limit_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入已使用额度最大值" v-model="searchForm.used_limit_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择" v-model="searchForm.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核" :value="0"></el-option>
                    <el-option label="拒绝注册" :value="-1"></el-option>
                    <el-option label="停用" :value="-2"></el-option>
                    <el-option label="启用" :value="1"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="注册时间">
                <el-date-picker v-model="searchForm.create_time" value-format="timestamp" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
            </el-form-item>
             
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="商户ID" prop="sh_id"></el-table-column>
            <el-table-column label="账号" prop="username"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="商户名称" prop="shop_name"></el-table-column>
            <el-table-column label="联系人" prop="contact"></el-table-column>
            <el-table-column label="联系电话" prop="tel"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="账户余额" prop="balance">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.balance | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="历史提现" prop="deposit">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.deposit | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="每天额度" prop="day_limit">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.day_limit | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="已使用额度" prop="used_limit">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.used_limit | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="未使用额度" prop="accounts_count">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.accounts_count | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.status | statusFilter }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="注册时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="title" width="350px">
                <template slot-scope="scope">
                    <el-button size="small" @click="checkDetail(scope.row.id)">查看</el-button>
                    <el-button size="small" type="primary" v-show="scope.row.status != -1" @click="accountDetail(scope.row.id, scope.row.balance)">账户明细</el-button>
                    <el-button size="small" type="success" @click="showEditFlag(scope.row.id)">编辑</el-button>
                    <el-button size="small" type="warning" v-show="scope.row.status == -2 || scope.row.status == 1" @click="changeStatus(scope.row)">{{ scope.row.status == 1 ? '停用' : '启用' }}</el-button>
                    <el-button type="primary" size="small" v-show="scope.row.status == 0" @click="showCheckFlag(scope.row.id)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

        <!-- 审核组件 -->
        <check-merchant :checkDialog="checkDialog" :id="id" @checkDialogFlag="checkDialogFlag"></check-merchant>
        <!-- 编辑组件 -->
        <edit-merchant :editDialog="editDialog" :id="id" @editDialogFlag="editDialogFlag"></edit-merchant>
    </div>
</template>

<script>
import merchantManage from '@/api/merchantManage'
import checkMerchant from './components/checkMerchant'
import editMerchant from './components/editMerchant'
export default {
    name: 'merchantInfo',
    components: {
        checkMerchant,
        editMerchant
    },
    data() {
        return {
            checkDialog: false,
            editDialog: false,
            id: 0,
            dataList: [],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 0,
                sh_id: '',
                username: '',
                phone: '',
                shop_name: '',
                contact: '',
                tel: '',
                address: '',
                balance_gt: '',
                balance_lt: '',
                deposit_gt: '',
                deposit_lt: '',
                day_limit_gt: '',
                day_limit_lt: '',
                used_limit_gt: '',
                used_limit_lt: '',
                status: '',
                create_time: '',
                create_time_gt: '',
                create_time_lt: '',
            }
        }
    },
    created() {
        this.getDataList()
    },
    filters: {
        statusFilter(value) {
            switch(value) {
                case -2: 
                    return '停用'
                case -1: 
                    return '拒绝注册'
                case 0: 
                    return '待审核'
                case 1: 
                    return '启用'
            }
        }
    },
    methods: {
        getDataList() {
           merchantManage.getMerchantList(this.searchForm).then(res => {
               if(res.code == 200) {
                   this.dataList = res.data.list
                   this.searchForm.dataCount = res.data.dataCount
               }
           })
        },
        handleCurrentChange(value) {
            this.searchForm.dataCount = value
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
        showCheckFlag(id) {
            this.id = id
            this.checkDialog = true
        },
        showEditFlag(id) {
            this.id = id
            this.editDialog = true
        },
        checkDialogFlag(value) {
            this.checkDialog = value
            this.getDataList()
        },
        editDialogFlag(value) {
            this.editDialog = value
            this.getDataList()
        },
        changeStatus(row) {
            merchantManage.changeStatus({id: row.id, status: row.status == 1 ? -2 : 1 }).then(res => {
                if(res.code == 200) {
                    this.$message.success('修改成功！')
                    this.getDataList()
                }
            })
        },
        checkDetail(id) {
            this.$router.push({ name: 'merchantDetail', query: { id: id } })
        },
        accountDetail(id, balance) {
            this.$router.push({ name: 'singleShopAccountDetail', query: { id: id, balance: balance } })
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
