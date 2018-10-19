<template>
    <!-- 账户范围分析 -->
    <div id="chartBox"></div>
</template>

<script>

// 引入 echarts基本模板
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require("echarts/lib/chart/bar")
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/markLine')

export default {
    data() {
        return {
            option: {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'category',
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '邮件营销',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '搜索引擎',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
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
