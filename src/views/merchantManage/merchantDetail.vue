<template>
    <div class="app-container">
        <div class="item">
            <span class="text">状态：</span>
            <span>{{ dataList.status | statusFilter }}</span>
        </div>
        <div class="item">
            <span class="text">商户ID：</span>
            <span>{{ dataList.sh_id }}</span>
        </div>
        <div class="item">
            <span class="text">账号：</span>
            <span>{{ dataList.username }}</span>
        </div>
        <div class="item">
            <span class="text">手机号码：</span>
            <span>{{ dataList.phone }}</span>
        </div>
        <div class="item">
            <span class="text">商户名称：</span>
            <span>{{ dataList.shop_name }}</span>
        </div>
        <div class="item">
            <span class="text">联系人：</span>
            <span>{{ dataList.contact }}</span>
        </div>
        <div class="item">
            <span class="text">联系电话：</span>
            <span>{{ dataList.tel }}</span>
        </div>
        <div class="item">
            <span class="text">地址：</span>
            <span>{{ dataList.address }}</span>
        </div>
        <el-form label-width="140px">
            <el-form-item label="银联卡充值手续费:">
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" max="100" v-model="dataList.conf[0].cz_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="text-align:center; font-size:20px;">
                    <span class="el-icon-plus"></span>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" v-model="dataList.conf[0].cz_service_fee" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="支付宝充值手续费:">
                <el-col :span="2">
                    <el-form-item >
                        <el-input disabled type="number" max="100" v-model="dataList.conf[1].cz_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="text-align:center; font-size:20px;">
                    <span class="el-icon-plus"></span>
                </el-col>
                <el-col :span="2">
                    <el-form-item >
                        <el-input disabled type="number" v-model="dataList.conf[1].cz_service_fee" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="微信充值手续费:">
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" max="100" v-model="dataList.conf[2].cz_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="text-align:center; font-size:20px;">
                    <span class="el-icon-plus"></span>
                </el-col>
                <el-col :span="2">
                    <el-form-item  prop="cz_service_fee3">
                        <el-input disabled type="number" v-model="dataList.conf[2].cz_service_fee"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Q码充值手续费:">
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" max="100" v-model="dataList.conf[3].cz_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="text-align:center; font-size:20px;">
                    <span class="el-icon-plus"></span>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" v-model="dataList.conf[3].cz_service_fee" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="银联卡提现手续费:">
                <el-col :span="2">
                    <el-form-item>
                        <el-input disabled type="number" max="100" v-model="dataList.conf[0].tx_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="text-align:center; font-size:20px;">
                    <span class="el-icon-plus"></span>
                </el-col>
                <el-col :span="2">
                    <el-form-item  prop="tx_service_fee">
                        <el-input disabled type="number" v-model="dataList.conf[0].tx_service_fee" ></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
        </el-form>
        <el-table :data="tableData">
            <el-table-column prop="date" label="账户余额" width="180"></el-table-column>
            <el-table-column prop="name" label="历史提现" width="180"></el-table-column>
            <el-table-column prop="address" label="每天额度" width="180"></el-table-column>
            <el-table-column prop="address" label="已使用额度" width="180"></el-table-column>
            <el-table-column prop="address" label="未使用额度" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import merchantManage from '@/api/merchantManage'
export default {
    name: 'merchantDetail',
    data() {
        return {
            dataList: {},
            tableData: [{
                
            }]
        }
    },
    created() {
        let id = this.$route.query.id
        
        merchantManage.getCheckMessage({id: id}).then(res => {
            if(res.code == 200) {
                this.dataList = res.data
            }
        })
    },
    filters: {
        statusFilter(value) {
            switch(value) {
                case -2: 
                    return '停用'
                case -1: 
                    return '拒绝注册'
                case 0: 
                    return '待审核'
                case 1: 
                    return '启用'
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .item {
        padding: 12px 0;
        color: #606266;
        font-size: 14px;
    }
    .text {
        width: 140px;
        text-align: right;
        display: inline-block;
        color: #606266;
        font-size: 14px;
    }
}   
</style>
