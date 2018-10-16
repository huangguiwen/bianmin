<template>
    <div class="app-container">
        <section class="recharge-message">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >提现信息</el-tag>
            </div>
            <div class="item">
                <span class="text">订单号：</span>
                <span>{{ dataList1[0].tx_id }}</span>
            </div>
            <div class="item">
                <span class="text">商户名称：</span>
                <span>{{ dataList1[0].shop_name }}</span>
            </div>
            <div class="item">
                <span class="text">提现金额：</span>
                <span>{{ dataList1[0].total_fee }}</span>
            </div>
            <div class="item">
                <span class="text">收取手续费：</span>
                <span>{{ dataList1[0].service_fee }}</span>
            </div>
            <div class="item">
                <span class="text">手续费成本：</span>
                <span>{{ dataList1[0].cost_fee }}</span>
            </div>
            <div class="item">
                <span class="text">银行：</span>
                <span>{{ dataList1[0].bank }}</span>
            </div>
            <div class="item">
                <span class="text">户名：</span>
                <span>{{ dataList1[0].bank_username }}</span>
            </div>
            <div class="item">
                <span class="text">收款账号：</span>
                <span>{{ dataList1[0].bank_account }}</span>
            </div>
            <div class="item">
                <span class="text">申请时间：</span>
                <span>{{ dataList1[0].create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
            </div>
            <div class="item">
                <span class="text">状态：</span>
                <span>{{ dataList1[0].status | statusFilter }}</span>
            </div>
        </section>
        <section class="processing-record">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >处理记录</el-tag>
            </div>
            <div v-for="(item, index) in dataList2" :key="index" style="padding: 10px; margin-top: 10px; border: 1px solid #ccc;">
                <div class="item">
                    <span class="text">审核人：</span>
                    <span>{{ item.approver }}</span>
                </div>
                <div class="item">
                    <span class="text">审核时间：</span>
                    <span>{{ item.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
                </div>
                <div class="item">
                    <span class="text">审核结果：</span>
                    <span>{{ item.result | resultFilter }}</span>
                </div>
                <div class="item">
                    <span class="text">订单号：</span>
                    <span>{{ item.pay_order_id }}</span>
                </div>
                <div class="item">
                    <span class="text">备注：</span>
                    <span>{{ item.note }}</span>
                </div>
            </div>
            
        </section>
    </div>
</template>

<script>
import fundsManage from '@/api/fundsManage'
export default {
    name: 'withdrawCheckDetail',
    data() {
        return {
            dataList1: [],
            dataList2: []
        }
    },
    created() {
        fundsManage.getWithdrawList({ id: this.$route.query.id }).then(res => {
            if(res.code == 200) {
                this.dataList1 = res.data.list
            }
        })
        fundsManage.getDetail({ type: 2, order_id: this.$route.query.id }).then(res => {
            if(res.code == 200) {
                this.dataList2 = res.data.list
            }
        })
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
        },
        resultFilter(value) {
            switch(value) {
                case 1: 
                    return '同意提现'
                case -1: 
                    return '拒绝提现'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recharge-message,
.processing-record {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
.item {
    padding: 10px 0;
}
.text {
    width: 100px;
    display: inline-block;
    text-align: right;
}
</style>
