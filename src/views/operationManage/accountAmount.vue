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
            <account-amount-chart></account-amount-chart>
        </section>
        <section>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="100-500额度"></el-table-column>
                <el-table-column prop="name" label="500-1000额度"></el-table-column>
                <el-table-column prop="name" label="1000-1500额度"></el-table-column>
                <el-table-column prop="name" label="1500-2000额度"></el-table-column>
                <el-table-column prop="name" label="2500-3000额度"></el-table-column>
                <el-table-column prop="name" label="3000-4000额度"></el-table-column>
                <el-table-column prop="name" label="4000-6000额度"></el-table-column>
                <el-table-column prop="name" label="6000-7000额度"></el-table-column>
                <el-table-column prop="name" label="7000-8000额度"></el-table-column>
            </el-table>
        </section>

    </div>
</template>

<script>
import accountAmountChart from './components/accountAmountChart'
export default {
    name: 'accountAmount',
    components: {
        accountAmountChart
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
