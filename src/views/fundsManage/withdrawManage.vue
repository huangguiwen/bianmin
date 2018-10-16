<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="订单号">
                <el-input placeholder="请输入订单号" v-model="searchForm.tx_id"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input placeholder="请输入商户名称" v-model="searchForm.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="户名">
                <el-input placeholder="请输入户名" v-model="searchForm.bank_username"></el-input>
            </el-form-item>
            <el-form-item label="收款账号">
                <el-input placeholder="请输入收款账号" v-model="searchForm.bank_account"></el-input>
            </el-form-item>
            <el-form-item label="收取手续费">
                <el-col :span="11">
                    <el-input placeholder="请输入手续费最小值" v-model="searchForm.service_fee_gt"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入手续费最大值" v-model="searchForm.service_fee_lt"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker v-model="searchForm.create_time" value-format="timestamp" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择" v-model="searchForm.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核提现" value="0"></el-option>
                    <el-option label="待商户确认" value="1"></el-option>
                    <el-option label="待处理提现" value="2"></el-option>
                    <el-option label="处理完成" value="3"></el-option>
                    <el-option label="拒绝提现" value="-1"></el-option>
                    <el-option label="关闭提现" value="-2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
                <el-button type="primary" class="el-icon-edit-outline">导出数据</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="订单号" prop="tx_id"></el-table-column>
            <el-table-column label="商户名称" prop="shop_name"></el-table-column>
            <el-table-column label="提现金额" prop="total_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.total_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收取手续费" prop="service_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.service_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手续费成本" prop="cost_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.cost_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="银行" prop="bank"></el-table-column>
            <el-table-column label="户名" prop="bank_username"></el-table-column>
            <el-table-column label="收款账号" prop="bank_account"></el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag type="primary">{{ scope.row.status | statusFilter }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="title" width="150px">
                <template slot-scope="scope">
                    <el-button size="small" @click="checkDetail(scope.row.id)">查看</el-button>
                    <el-button type="primary" size="small" @click="audit(scope.row.id)" v-if="scope.row.status == 0">审核</el-button>
                    <el-button type="success" size="small" @click="audit(scope.row.id)" v-if="scope.row.status == 1 || scope.row.status == 3 || scope.row.status == -1">修改</el-button>
                    <el-button type="success" size="small" @click="dispose(scope.row.id)" v-if="scope.row.status == 2">处理</el-button>
                    <!--  -->
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

        <!-- 审核组件 -->
        <withdraw-check :checkFlag="checkFlag" :id="id" @checkFlagChange="checkFlagChange"></withdraw-check>
    </div>
</template>

<script>
import fundsManage from '@/api/fundsManage'
import withdrawCheck from './components/withdrawCheck'
export default {
    name: 'withdrawManage',
    components: {
        withdrawCheck
    },
    data() {
        return {
            id: 0,
            checkFlag: false,
            dataList: [],
            searchForm: {
                limit : 10,
                page: 1,
                dataCount: 0
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
                    return '关闭提现'
                case -1: 
                    return '拒绝提现'
                case 0: 
                    return '待审核提现'
                case 1: 
                    return '待商户确认'
                case 2: 
                    return '待处理提现'
                case 3: 
                    return '处理完成'
            }
        }
    },
    methods: {
        getDataList() {
            new Promise(resolve => {
                fundsManage.getWithdrawList(this.searchForm).then(res =>{
                    if(res.code == 200) {
                        this.dataList = res.data.list
                        this.searchForm.dataCount = res.data.dataCount
                        resolve()
                    }
                })
            })
        },
        handleCurrentChange(value) {
            this.searchForm.page = value
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
        checkFlagChange(value) {
            this.checkFlag = value
        },
        audit(id) {
            this.id = id
            this.checkFlag = true
        },
        dispose(id) {
            this.$router.push({ name: 'withdrawDispose', query: { id: id } })
        },
        checkDetail(id) {
            this.$router.push({ name: 'withdrawCheckDetail', query: { id: id } })
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
