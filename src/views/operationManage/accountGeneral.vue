<template>
    <div class="app-container">
        <section>
            <el-button-group>
                <el-button type="primary">最近7天</el-button>
                <el-button type="primary">最近30天</el-button>
            </el-button-group>
            <el-date-picker v-model="dataTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            <el-button type="primary" class="el-icon-search">搜索</el-button>
        </section>
        <section>
            <el-button-group>
                <el-button type="primary">总额度</el-button>
                <el-button type="primary">已使用额度</el-button>
                <el-button type="primary">已使用账户数量</el-button>
            </el-button-group>
            <recharge-chart></recharge-chart>
        </section>
        <section>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="充值次数"></el-table-column>
                <el-table-column prop="name" label="充值金额"></el-table-column>
                <el-table-column prop="name" label="到账金额"></el-table-column>
                <el-table-column prop="name" label="待审核充值订单数量"></el-table-column>
                <el-table-column prop="name" label="待审核充值订单总金额"></el-table-column>
            </el-table>
        </section>

    </div>
</template>

<script>
import rechargeChart from './components/rechargeChart'   
export default {
    name: 'accountGeneral',
    components: {
        rechargeChart
    },
    data() {
        return {
            dataTime: '',
            tableData: [{
                date: '2017-06-24',
                name: 100
            },{
                date: '2017-06-24',
                name: 100
            },{
                date: '2017-06-24',
                name: 100
            },{
                date: '2017-06-24',
                name: 100
            },{
                date: '2017-06-24',
                name: 100
            }]
        }
    }
    
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    section{
        padding: 15px;
        &+section {
            border-top: 1px solid #ccc;
        }
    }
}
</style>
