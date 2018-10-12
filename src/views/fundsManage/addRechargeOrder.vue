<template>
    <div class="app-container">
        <section class="recharge-message">
            <div>
                <el-tag type="primary" style="font-size: 20px; padding: 0 10px; height: 40px; line-height: 40px;" >充值信息</el-tag>
            </div>
            <el-form ref="form" :inline="true" label-width="100px">
                <el-form-item label="充值号：">
                    <span>CZ20180905004</span>
                </el-form-item>
                <el-form-item label="商户订单号：">
                    <el-input placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="商户名称：">
                    <el-autocomplete v-model="shopName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"></el-autocomplete>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import fundsManage from '@/api/fundsManage'
export default {
    name: 'addRechargeOrder',
    data() {
        return {
            shopName: ''
        }
    },
    methods: {
        querySearchAsync(queryString, cb) {
            fundsManage.getRechargeList({ shop_name: queryString }).then(res => {
                if(res.code == 200) {
                    let results = res.data.list
                                    .filter(item => item.shop_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
                                    .map(item => { return { value: item.shop_name } })
                    cb(results)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.recharge-message{
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
