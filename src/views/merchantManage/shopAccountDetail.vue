<template>
    <div class="app-container">
        
        <el-form ref="form" :inline="true">
            <el-form-item label="时间">
                <el-date-picker v-model="searchForm.create_time" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="流水号">
                <el-input placeholder="请输入流水号" v-model="searchForm.running_num"></el-input>
            </el-form-item>
            <el-form-item label="商户ID">
                <el-input placeholder="请输入商户ID" v-model="searchForm.sh_id"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input placeholder="请输入商户名称" v-model="searchForm.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
                <el-input placeholder="请输入订单号" v-model="searchForm.order"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select clearable placeholder="请选择" v-model="searchForm.type">
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
        <el-table :data="dataList">
            <el-table-column label="时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="流水号" prop="running_num"></el-table-column>
            <el-table-column label="商户ID" prop="sh_id"></el-table-column>
            <el-table-column label="商户" prop="shop_name"></el-table-column>
            <el-table-column label="订单号" prop="order"></el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="收支金额" prop="fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.fee | toFixed(2)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号余额" prop="balance">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.balance | toFixed(2)}}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

    </div>
</template>

<script>
import merchantManage from '@/api/merchantManage'
export default {
    name: 'shopAccountDetail',
   
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
        }
    },
    methods: {
        getDataList() {
            merchantManage.getAccountDetail(this.searchForm).then(res => {
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
    
}
</style>
