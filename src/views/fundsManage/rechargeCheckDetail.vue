<template>
    <div class="app-container">
        <section class="recharge-message">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >提现信息</el-tag>
            </div>
            <div class="item">
                <span class="text">充值号：</span>
                <span>{{ dataList1[0].cz_id }}</span>
            </div>
            <div class="item">
                <span class="text">商户订单号：</span>
                <span>{{ dataList1[0].shop_order_id }}</span>
            </div>
            <div class="item">
                <span class="text">商户名称：</span>
                <span>{{ dataList1[0].shop_name }}</span>
            </div>
            <div class="item">
                <span class="text">订单金额：</span>
                <span>{{ dataList1[0].total_fee }}</span>
            </div>
            <div class="item">
                <span class="text">充值金额：</span>
                <span>{{ dataList1[0].real_fee }}</span>
            </div>
            <div class="item">
                <span class="text">收取手续费</span>
                <span>{{ dataList1[0].service_fee }}</span>
            </div>
            <div class="item">
                <span class="text">手续费成本</span>
                <span>{{ dataList1[0].cost_fee }}</span>
            </div>
            <div class="item">
                <span class="text">类型：</span>
                <span>{{ dataList1[0].account_type | accounType }}</span>
            </div>
            <div class="item">
                <span class="text">户名：</span>
                <span>{{ dataList1[0].account_name }}</span>
            </div>
            <div class="item">
                <span class="text">收款账户：</span>
                <span>{{ dataList1[0].account }}</span>
            </div>
            <div class="item">
                <span class="text">充值时间：</span>
                <span>{{ dataList1[0].create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
            </div>
            <div class="item">
                <span class="text">状态：</span>
                <span>{{ dataList1[0].status | accontStatus }}</span>
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
    name: 'rechargeCheckDetail',
    data() {
        return {
            dataList1: [],
            dataList2: []
        }
    },
    created() {
        fundsManage.getRechargeList({ id: this.$route.query.id }).then(res => {
            if(res.code == 200) {
                this.dataList1 = res.data.list
            }
        })
        fundsManage.getDetail({ type: 1, order_id: this.$route.query.id }).then(res => {
            if(res.code == 200) {
                this.dataList2 = res.data.list
            }
        })
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
        accontStatus(value) {
            switch(value) {
                case 0: 
                    return '待审核'
                case 1: 
                    return '确认到账'
                case -1: 
                    return '未到账'
            }
        },
        resultFilter(value) {
            switch(value) {
                case 1: 
                    return '同意充值'
                case -1: 
                    return '拒绝充值'
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
