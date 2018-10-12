<template>
    <!-- 充值分析 -->
    <div id="chartBox"></div>
</template>

<script>

// 引入 echarts基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require("echarts/lib/chart/line")
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/markLine')

export default {
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'充值金额',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            }
        }
    },
    props: {
        dataList: {
            type: Object
        }
    },
    // watch: {
    //     dataList: {
    //         deep: true,
    //         handler() {
    //             this.getData()
    //         }
    //     }
    // },
    created() {
        this.$nextTick(() => {
            this.drawChart(this.option)
        })
    },
    methods: {
        // getData() {
        //     let option = this.getCompanyTypeChartOption()
        //     let seriesData = this.dataList.typeStat.map(item => { return { name: item.name, value: item.count} })
        //     option.series[0].data = [...seriesData]
        //     this.drawLine(option)
        // },
        drawChart(option) {
            // 基于准备好的dom，初始化echarts实例
            let companyTypeChart = echarts.init(document.getElementById('chartBox'))
            // 绘制图表
            companyTypeChart.setOption(option);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#chartBox {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc; 
    padding: 15px;
    margin: 20px 0;
}

</style>
