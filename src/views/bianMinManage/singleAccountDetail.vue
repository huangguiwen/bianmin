<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="账号ID">
                <span></span>
            </el-form-item>
            <el-form-item label="户名">
                <span></span>
            </el-form-item>
            <el-form-item label="类型">
                <span></span>
            </el-form-item>
            <el-form-item label="账号">
                <span></span>
            </el-form-item>
            <el-form-item label="绑定商家">
                <span></span>
            </el-form-item>
        </el-form>
        <el-table>
            <el-table-column label="账户余额" prop="zh_id"></el-table-column>
            <el-table-column label="今日充值金额" prop="name"></el-table-column>
            <el-table-column label="今日充值笔数" prop="identity_num"></el-table-column>
            <el-table-column label="本月充值金额" prop="phone"></el-table-column>
            <el-table-column label="本月充值笔数" prop="zh_id"></el-table-column>
            <el-table-column label="今日提现金额" prop="name"></el-table-column>
            <el-table-column label="今日提现笔数" prop="identity_num"></el-table-column>
            <el-table-column label="本月提现金额" prop="phone"></el-table-column>
            <el-table-column label="本月提现笔数" prop="zh_id"></el-table-column>
            <el-table-column label="历史提现" prop="name"></el-table-column>
            <el-table-column label="今日额度" prop="identity_num"></el-table-column>
            <el-table-column label="今日未使用额度" prop="phone"></el-table-column>
            <el-table-column label="历史总额度" prop="identity_num"></el-table-column>
            <el-table-column label="佣金总额" prop="phone"></el-table-column>
        </el-table>
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
                    <el-option label="充值" value="2"></el-option>
                    <el-option label="充值手续费" value="3"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
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
                    <el-tag>{{ scope.row.type }}</el-tag>
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

    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
export default {
    name: 'singleAccountDetail',
   
    data() {
        return {
            dataList: [],
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
    // filters: {
    //     accounType(value) {
    //         switch(value) {
    //             case 1: 
    //                 return '银联卡'
    //             case 2: 
    //                 return '支付宝'
    //             case 3: 
    //                 return '微信'
    //             case 4: 
    //                 return 'Q码'
    //         }
    //     },
    //     accontStatus(value) {
    //         switch(value) {
    //             case 0: 
    //                 return '停用'
    //             case 1: 
    //                 return '使用中'
    //         }
    //     }
    // },
    methods: {
        getDataList() {
            bianMinManage.getAccountDetail(this.searchForm).then(res => {
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
        searchData() {
            try {
                if(this.searchForm.create_time != '') {
                    this.searchForm.create_time_gt = parseInt(this.searchForm.create_time[0])/1000
                    this.searchForm.create_time_lt = parseInt(this.searchForm.create_time[1])/1000
                }
            } catch (error) {
                
            }
            this.getDataList()
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
