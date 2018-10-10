<template>
    <div class="app-container">
        <section>
            <h4>手续费设置</h4>
            <el-form ref="form" v-for="(item, index) in formList" :key="index" :inline="true" class="form" :class="{bottomLine: index==3 }" label-width="200px">
                <el-form-item :label="item.title"></el-form-item>
                <el-form-item label="实际成本按充值金额">
                    <el-col :span="8">
                        <el-input type="number" v-model="dataList[index].cz_real_cost_per" max="100">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input type="number" v-model="dataList[index].cz_real_cost"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="向商户收取手续费按充值金额">
                    <el-col :span="8">
                        <el-input type="number" v-model="dataList[index].cz_service_fee_per" max="100">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input type="number" v-model="dataList[index].cz_service_fee"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form"  :inline="true" class="form" label-width="200px">
                <el-form-item label="银联卡提现手续费："></el-form-item>
                <el-form-item label="实际成本按提现金额">
                    <el-col :span="8">
                        <el-input type="number" v-model="dataList[0].tx_real_cost_per" max="100">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>

                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input type="number" v-model="dataList[0].tx_real_cost"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="向商户收取手续费按提现金额">
                    <el-col :span="8">
                        <el-input type="number" v-model="dataList[0].tx_service_fee_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input type="number" v-model="dataList[0].tx_service_fee"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
        <section>
            <h4>边民充值账号智能参数设置</h4>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="银联卡每天总额度">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[0].day_limit"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input type="number" v-model="dataList[0].dey_limit_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="银联卡最大使用次数">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[0].limit_sum"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="支付宝每天总额度">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[1].day_limit"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input type="number" v-model="dataList[1].dey_limit_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付宝最大使用次数">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[1].limit_sum"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="微信每天总额度">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[2].day_limit"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input type="number" v-model="dataList[2].dey_limit_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信最大使用次数">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[2].limit_sum"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="Q码每天总额度">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[3].day_limit"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input type="number" v-model="dataList[3].dey_limit_per">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="Q码卡最大使用次数">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[3].limit_sum"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
        <section>
            <h4>商户设置</h4>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="默认每天最高额度">
                    <el-col :span="24">
                        <el-input type="number" v-model="dataList[4].shop_day_limit"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
        <section style="text-align: center;">
            <el-button type="primary" @click="submitData">保存</el-button>
        </section>
    </div>
</template>

<script>
import systemConfig from '@/api/systemConfig'
export default {
    name: 'baseSetting',
    data() {
        return {
            formList: [{
                title: '银联卡充值手续费：'
            },{
                title: '支付宝充值手续费：'
            },{
                title: '微信充值手续费：'
            },{
                title: 'Q码充值手续费：'
            }],
            dataList: [{
                type: 1, 
                type_name: '银联卡',
                cz_real_cost_per: '',
                cz_real_cost: '',
                cz_service_fee_per: '',
                cz_service_fee: '',
                tx_real_cost_per: '',
                tx_real_cost: '',
                tx_service_fee_per: '',
                tx_service_fee: '',
                day_limit: '',
                dey_limit_per: '',
                limit_sum: ''
            },{
                type: 2, 
                type_name: '支付宝',
                cz_real_cost_per: '',
                cz_real_cost: '',
                cz_service_fee_per: '',
                cz_service_fee: '',
                day_limit: '',
                dey_limit_per: '',
                limit_sum: ''
            },{
                type: 3, 
                type_name: '微信',
                cz_real_cost_per: '',
                cz_real_cost: '',
                cz_service_fee_per: '',
                cz_service_fee: '',
                day_limit: '',
                dey_limit_per: '',
                limit_sum: ''
            },{
                type: 4, 
                type_name: 'Q码',
                cz_real_cost_per: '',
                cz_real_cost: '',
                cz_service_fee_per: '',
                cz_service_fee: '',
                day_limit: '',
                dey_limit_per: '',
                limit_sum: ''
            },{
                type: 0, 
                type_name: '默认每天最高额度',
                shop_day_limit: ''
            }]
        }
    },
    created() {
        this.getDataList()
    },
    methods: {
        getDataList() {
            systemConfig.getMerchantList().then(res => {
                if(res.code == 200) {
                    this.dataList = res.data
                }
            })
        },
        submitData() {
            systemConfig.updateMerchant({data: this.dataList}).then(res => {
                if(res.code == 200) {
                    this.$message.success('提交成功！')
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    h4 { color: #555; }
    .form {
        padding-top: 20px; 
    }
    .bottomLine {
        border-bottom: 1px solid #ccc;
    }
}
</style>
