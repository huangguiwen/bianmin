<template>
    <div class="app-container">
        <section>
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
                <el-form-item label="订单金额：">
                    <el-input placeholder="请输入订单金额："></el-input>
                </el-form-item>
                <el-form-item label="充值金额：">
                    <span>1500</span>
                </el-form-item>
                <el-form-item label="收取手续费：">
                    <span>1.5</span>
                </el-form-item>
                <el-form-item label="手续费陈本：">
                    <span>1.5</span>
                </el-form-item>
            </el-form>
        </section>
        <section>
            <h3>——选择收款边民账号——</h3>
            <el-form ref="form" :inline="true">
                <el-form-item label="户名">
                    <el-input placeholder="请输入户名"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select clearable placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="银联卡" value="1"></el-option>
                        <el-option label="支付宝" value="2"></el-option>
                        <el-option label="微信" value="3"></el-option>
                        <el-option label="Q码" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="今日提现金额">
                    <el-col :span="11">
                        <el-input placeholder="请输入今日提现金额最小值"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入今日提现金额最大值"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-icon-search">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="dataList">
                <el-table-column label="账户ID" prop="tx_id"></el-table-column>
                <el-table-column label="户名" prop="shop_name"></el-table-column>
                <el-table-column label="类型" prop="total_fee"></el-table-column>
                <el-table-column label="账号" prop="service_fee"></el-table-column>
                <el-table-column label="账户余额" prop="bank"></el-table-column>
                <el-table-column label="今日提现金额" prop="bank_username"></el-table-column>
                <el-table-column label="今日提现笔数" prop="bank_account"></el-table-column>
                <el-table-column label="本月提现金额" prop="status"></el-table-column>
                <el-table-column label="本月提现笔数" prop="create_time"></el-table-column>
                <el-table-column label="操作" prop="title" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section>
            <h3>——已选择收款边民账号——</h3>
            <el-table :data="dataList">
                <el-table-column label="账户ID" prop="tx_id"></el-table-column>
                <el-table-column label="户名" prop="shop_name"></el-table-column>
                <el-table-column label="类型" prop="total_fee"></el-table-column>
                <el-table-column label="账号" prop="service_fee"></el-table-column>
                <el-table-column label="账户余额" prop="bank"></el-table-column>
                <el-table-column label="今日提现金额" prop="bank_username"></el-table-column>
                <el-table-column label="今日提现笔数" prop="bank_account"></el-table-column>
                <el-table-column label="本月提现金额" prop="status"></el-table-column>
                <el-table-column label="本月提现笔数" prop="create_time"></el-table-column>
                <el-table-column label="操作" prop="title" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
section {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    .flex-box {
        display: flex;
        align-items: center;
        &>div {
            flex: 1;
        }
    }
    h3 {
        text-align: center;
    }
    
}
.item {
    padding: 10px 0;
}
.text {
    width: 100px;
    display: inline-block;
    text-align: right;
}
.line {
    text-align: center;
}
</style>
