<template>
    <div class="app-container">
        <section>
            <el-form ref="form" :inline="true">
                <el-form-item label="账号ID：" style="margin-right: 50px;">
                    <span>{{ dataList1[0].zh_id }}</span>
                </el-form-item>
                <el-form-item label="户名：" style="margin-right: 50px;">
                    <span>{{ dataList1[0].name }}</span>
                </el-form-item>
                <el-form-item label="类型：" style="margin-right: 50px;">
                    <span>{{ dataList1[0].account_type | accounType }}</span>
                </el-form-item>
                <el-form-item label="账号：" style="margin-right: 50px;">
                    <span>{{ dataList1[0].account }}</span>
                </el-form-item>
                <el-form-item label="绑定商家：" style="margin-right: 50px;">
                    <span>{{ dataList1[0].shop_name }}</span>
                </el-form-item>
            </el-form>
            <el-table :data="dataList1">
                <el-table-column label="账户余额" prop="balance"></el-table-column>
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
                <el-table-column label="佣金总额" prop="">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.month_recharge_fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section>
            <el-form ref="form" :inline="true">
                <el-form-item label="商家ID">
                    <el-input placeholder="请输入商家ID" v-model="searchForm.sh_id"></el-input>
                </el-form-item>
                <el-form-item label="商家名称">
                    <el-input placeholder="请输入商家名称"  v-model="searchForm.shop_name"></el-input>
                </el-form-item>
                <el-form-item label="用途">
                    <el-input placeholder="请输入用途"></el-input>
                </el-form-item>
                <el-form-item label="交易金额">
                    <el-col :span="11">
                        <el-input placeholder="请输入交易金额最小值"  v-model="searchForm.balance_gt"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入交易金额最大值"  v-model="searchForm.balance_lt"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="录入时间">
                    <el-date-picker v-model="searchForm.create_time" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select clearable placeholder="请选择"  v-model="searchForm.type">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="提现" value="1"></el-option>
                        <el-option label="提现手续费" value="2"></el-option>
                        <el-option label="退款提现金额" value="3"></el-option>
                        <el-option label="退款提现手续费" value="4"></el-option>
                        <el-option label="充值" value="5"></el-option>
                        <el-option label="充值手续费" value="6"></el-option>
                        <el-option label="退款充值金额" value="7"></el-option>
                        <el-option label="退款充值手续费" value="8"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="dataList2">
                <el-table-column label="订单号" prop="order"></el-table-column>
                <el-table-column label="商家ID" prop="sh_id"></el-table-column>
                <el-table-column label="商家名称" prop="shop_name"></el-table-column>
                <el-table-column label="交易金额" prop="fee">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="用途"></el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="录入时间" prop="create_time">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="余额" prop="balance">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.balance | toFixed(2) }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
                :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>
        </section>

    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
export default {
    name: 'singleAccountDetail',
    data() {
        return {
            dataList1: [],
            dataList2: [],
            searchForm: {
                limit: 10,
                page: 1,
                dataCount: 0
            }
        }
    },
    created() {
        bianMinManage.getOverViewList({ id: this.$route.query.id }).then(res =>{
            if(res.code == 200) {
                this.dataList1 = res.data.list
            }
        })
        this.getDataList()
    },
    filters: {
        typeFilter(value) {
            switch(value) {
                case 1: 
                    return '提现'
                case 2: 
                    return '提现手续费'
                case 3: 
                    return '退款提现金额'
                case 4: 
                    return '退款提现手续费'
                case 5: 
                    return '充值'
                case 6: 
                    return '充值手续费'
                case 7: 
                    return '退款充值金额'
                case 8: 
                    return '退款充值手续费'
            }
        },
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
            bianMinManage.getAccountDetail(this.searchForm).then(res => {
                if(res.code == 200) {
                    this.dataList2 = res.data.list
                    this.searchForm.dataCount = res.data.dataCount
                }
            })
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
                this.searchForm.create_time_gt = ''
                this.searchForm.create_time_lt = ''
            }
            this.getDataList()
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    section {
        padding: 10px;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }
    .line {
        text-align: center;
    }
}
</style>
