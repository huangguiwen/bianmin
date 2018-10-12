<template>
    <div class="app-container">
        <section class="recharge-message">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >充值信息</el-tag>
            </div>
            <div class="item">
                <span class="text">充值号：</span>
                <span>CZ20180905004</span>
            </div>
            <div class="item">
                <span class="text">商户订单号：</span>
                <span>20120180905010</span>
            </div>
            <div class="item">
                <span class="text">商户名称：</span>
                <span>尚佳商城</span>
            </div>
            <div class="item">
                <span class="text">订单金额：</span>
                <span>1531</span>
            </div>
            <div class="item">
                <span class="text">充值金额：</span>
                <span>123213</span>
            </div>
            <div class="item">
                <span class="text">收取手续费</span>
                <span>12313</span>
            </div>
            <div class="item">
                <span class="text">手续费成本</span>
                <span>2313</span>
            </div>
            <div class="item">
                <span class="text">类型：</span>
                <span>银联卡</span>
            </div>
            <div class="item">
                <span class="text">户名：</span>
                <span>程玲</span>
            </div>
            <div class="item">
                <span class="text">收款账户：</span>
                <span>6222600260001072444</span>
            </div>
            <div class="item">
                <span class="text">充值时间：</span>
                <span>2018-09-05 18:20:25</span>
            </div>
            <div class="item">
                <span class="text">状态：</span>
                <span>确认到账</span>
            </div>
        </section>
        <section class="processing-record">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >处理记录</el-tag>
            </div>
            <div class="item">
                <span class="text">审核人：</span>
                <span>程玲琳</span>
            </div>
            <div class="item">
                <span class="text">审核时间：</span>
                <span>2018-0-05 18:25:36</span>
            </div>
            <div class="item">
                <span class="text">审核结果：</span>
                <span>确认到账</span>
            </div>
            <div class="item">
                <span class="text">订单号：</span>
                <span>6222600260001072444</span>
            </div>
            <div class="item">
                <span class="text">备注：</span>
                <span>已经到账</span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'rechargeCheckDetail'
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
