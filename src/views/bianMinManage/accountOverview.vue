<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="账户ID">
                <el-input placeholder="请输入账户ID" v-model="searchForm.zh_id"></el-input>
            </el-form-item>
            <el-form-item label="户名">
                <el-input placeholder="请输入户名" v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input placeholder="请输入账号" v-model="searchForm.account"></el-input>
            </el-form-item>
            <el-form-item label="绑定商家">
                <el-input placeholder="请输入绑定商家" v-model="searchForm.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-input placeholder="请输入账户余额" v-model="searchForm.balance"></el-input>
            </el-form-item>
            <el-form-item label="今日充值金额">
                <el-col :span="11">
                    <el-input placeholder="请输入今日充值金额最小值" v-model="searchForm.day_recharge_fee_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入今日充值金额最大值" v-model="searchForm.day_recharge_fee_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="今日充值笔数">
                <el-col :span="11">
                    <el-input placeholder="请输入今日充值笔数最小值" v-model="searchForm.day_recharge_count_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入今日充值笔数最大值" v-model="searchForm.day_recharge_count_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="本月充值金额">
                <el-col :span="11">
                    <el-input placeholder="请输入本月充值金额最小值" v-model="searchForm.month_recharge_fee_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入本月充值金额最大值" v-model="searchForm.month_recharge_fee_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="本月充值笔数">
                <el-col :span="11">
                    <el-input placeholder="请输入本月充值笔数最小值" v-model="searchForm.month_recharge_count_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入本月充值笔数最大值" v-model="searchForm.month_recharge_count_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="历史总额度">
                <el-col :span="11">
                    <el-input placeholder="请输入历史总额度最小值"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入历史总额度最大值"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="今日提现金额">
                <el-col :span="11">
                    <el-input placeholder="请输入今日提现金额最小值" v-model="searchForm.day_deposit_fee_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入今日提现金额最大值" v-model="searchForm.day_deposit_fee_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="类型">
                <el-select clearable placeholder="请选择" v-model="searchForm.account_type">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="银联卡" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="3"></el-option>
                    <el-option label="Q码" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search">搜索</el-button>
            </el-form-item>
             
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="账户ID" prop="zh_id"></el-table-column>
            <el-table-column label="户名" prop="name"></el-table-column>
            <el-table-column label="类型" prop="account_type">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="账号" prop="account"></el-table-column>
            <el-table-column label="账户余额" prop="balance"></el-table-column>
            <el-table-column label="绑定商家" prop="shop_name"></el-table-column>
            <el-table-column label="今日充值金额" prop="day_recharge_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.day_recharge_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="今日充值笔数" prop="day_recharge_count"></el-table-column>
            <el-table-column label="本月充值金额" prop="month_recharge_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.month_recharge_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="本月充值笔数" prop="month_recharge_count"></el-table-column>
            <el-table-column label="今日提现金额" prop="day_deposit_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.day_deposit_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="今日提现笔数" prop="day_deposit_count"></el-table-column>
            <el-table-column label="本月提现金额" prop="month_deposit_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.month_deposit_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="本月提现笔数" prop="month_deposit_count"></el-table-column>
            <el-table-column label="历史提现" prop="history_deposit_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.history_deposit_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="今日额度" prop="day_limit">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.day_limit | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="今日未使用额度" prop="accounts_count">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.month_recharge_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="历史总额度" prop="">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.month_recharge_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="佣金总额" prop="accounts_count"></el-table-column> -->
            <el-table-column label="操作" fixed="right" prop="title" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="checkAccountDetail(scope.row.id)">账户明细</el-button>
                    <!-- <el-button type="warning" size="small">佣金明细</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
export default {
    name: 'accountOverview',
    data() {
        return {
            dataList:[],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 0
            }
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
    },
    methods: {
        getDataList() {
            new Promise(resolve => {
                bianMinManage.getOverViewList(this.searchForm).then(res =>{
                    if(res.code == 200) {
                        this.dataList = res.data.list
                        this.searchForm.dataCount = res.data.dataCount
                        resolve()
                    }
                })
            })
        },
        handleCurrentChange(value) {
            this.searchForm.dataCount = value
            this.getDataList()
        },
        checkAccountDetail(id) {
            this.$router.push({ name: 'singleAccountDetail', query: { id: id } })
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
