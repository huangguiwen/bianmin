<template>
    <div class="app-container">
        <section>
            <div class="flex-box">
                <div>
                    <p>订单号：TX201809065018</p>
                    <p>提现金额：1500</p>
                    <p>银行：招商银行</p>
                    <p>申请时间：2018-09-06 18:20:25</p>
                </div>
                <div>
                    <p>商户名称：尚佳商城</p>
                    <p>收取手续费：1.5</p>
                    <p>户名：陈领馆</p>
                    <p>状态：待处理提现</p>
                </div>
                <div>
                    <p>手续费成本：1.2</p>
                    <p>收款账号：6222600260001072444</p>
                </div>
            </div>
        </section>
        <section>
            <h3>——选择打款给商户的边民账号——</h3>
            <el-form ref="form" :inline="true">
                <el-form-item label="户名">
                    <el-input placeholder="请输入户名"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="状态">
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
                <el-form-item label="本月提现金额">
                    <el-col :span="11">
                        <el-input placeholder="请输入本月提现金额最小值"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入本月提现金额最大值"></el-input>
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
            <h3>——已选择打款给商户的边民账号——</h3>
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
export default {
    name: 'withdrawDispose',
    data() {
        return {
            dataList: [{}]
        }
    },
    methods: {
        
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

</style>
