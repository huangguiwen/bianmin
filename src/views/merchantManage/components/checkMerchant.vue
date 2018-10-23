<template>
    <div class="app-container">
        <el-dialog title="审核" :visible.sync="showFlag" :before-close="beforeClose" width="40%">
            <div class="item">
                <span class="text">商户ID：</span>
                <span>{{ dataList.sh_id }}</span>
            </div>
            <div class="item">
                <span class="text">账号：</span>
                <span>{{ dataList.username }}</span>
            </div>
            <div class="item">
                <span class="text">手机号：</span>
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
            <div class="item" style="border-bottom: 1px solid #ccc;">
                <span class="text">地址：</span>
                <span>{{ dataList.address }}</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form" label-width="140px">
                <el-form-item label="审核结果:" prop="checkResult">
                    <el-radio v-model="ruleForm.checkResult" :label="1">通过注册</el-radio>
                    <el-radio v-model="ruleForm.checkResult" :label="-1">拒绝注册</el-radio>
                </el-form-item>
                <el-form-item label="每天额度:" prop="day_limit">
                    <el-input v-model="ruleForm.day_limit"></el-input>
                </el-form-item>
                <el-form-item label="银联卡充值手续费:" required v-if="ruleForm.checkResult == 1">
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per1">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per1">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee1">
                            <el-input type="number" v-model="ruleForm.cz_service_fee1" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付宝充值手续费:" required v-if="ruleForm.checkResult == 1">
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per2">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per2">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee2">
                            <el-input type="number" v-model="ruleForm.cz_service_fee2" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信充值手续费:" required v-if="ruleForm.checkResult == 1">
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per3">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per3">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee3">
                            <el-input type="number" v-model="ruleForm.cz_service_fee3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="Q码充值手续费:" required v-if="ruleForm.checkResult == 1">
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per4">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per4">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee4">
                            <el-input type="number" v-model="ruleForm.cz_service_fee4" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="银联卡提现手续费:" required v-if="ruleForm.checkResult == 1">
                    <el-col :span="8">
                        <el-form-item  prop="tx_service_fee_per">
                            <el-input type="number" max="100" v-model="ruleForm.tx_service_fee_per">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="tx_service_fee">
                            <el-input type="number" v-model="ruleForm.tx_service_fee" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="审核意见:" prop="note">
                    <el-input type="textarea" v-model="ruleForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkCancel">取 消</el-button>
                <el-button type="primary" @click="checkSumbit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import merchantManage from '@/api/merchantManage'
export default {
    data() {
        return {
            dataList: {},
            checkResult: 1,
            day_limit: '',
            ruleForm: {
                checkResult: 1,
                note: '',
                cz_service_fee_per1: '',
                cz_service_fee1: '',
                cz_service_fee_per2: '',
                cz_service_fee2: '',
                cz_service_fee_per3: '',
                cz_service_fee3: '',
                cz_service_fee_per4: '',
                cz_service_fee4: '',
                tx_service_fee_per: '',
                tx_service_fee: '',
            },
            rules: {
                checkResult: [
                    { required: true, message: '请选择审核结果', trigger: 'change' }
                ],
                note: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
                day_limit: [
                    { required: true, message: '请输入每天额度', trigger: 'blur' }
                ],
                cz_service_fee_per1: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee1: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per2: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee2: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per3: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee3: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per4: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee4: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                tx_service_fee_per: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                tx_service_fee: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        checkDialog: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: 0
        }
    },
    watch: {
        async id(value) {
            await this.getDataList()
            
            this.ruleForm =  {
                checkResult: 1,
                checkAdvice: '',
                day_limit: this.dataList.day_limit,
                cz_service_fee_per1: this.dataList.conf[0].cz_service_fee_per,
                cz_service_fee1: this.dataList.conf[0].cz_service_fee,
                cz_service_fee_per2: this.dataList.conf[1].cz_service_fee_per,
                cz_service_fee2: this.dataList.conf[1].cz_service_fee,
                cz_service_fee_per3: this.dataList.conf[2].cz_service_fee_per,
                cz_service_fee3: this.dataList.conf[2].cz_service_fee,
                cz_service_fee_per4: this.dataList.conf[3].cz_service_fee_per,
                cz_service_fee4: this.dataList.conf[3].cz_service_fee,
                tx_service_fee_per: this.dataList.conf[0].tx_service_fee_per,
                tx_service_fee: this.dataList.conf[0].tx_service_fee,
            }
        },
        showFlag() {
            this.$refs.ruleForm.clearValidate()
        }
    },
    computed: {
        showFlag() {
            return this.checkDialog
        }
    },
    methods: {
        async getDataList() {
            await new Promise(resolve => {
                merchantManage.getCheckMessage({id: this.id}).then(res => {
                    if(res.code == 200) {
                        this.dataList = res.data
                        resolve()
                    }
                })
            })
            
        },
        beforeClose() {
            this.$emit('checkDialogFlag', false)
        },
        checkCancel() {
            this.$emit('checkDialogFlag', false)
        },
        checkSumbit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                let sumbitData = {
                    id: this.dataList.id,
                    shop_id: this.dataList.shop_id,
                    status: this.ruleForm.checkResult,
                    day_limit: this.ruleForm.day_limit,
                    conf: [{
                        type: 1,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per1,
                        cz_service_fee: this.ruleForm.cz_service_fee1,
                        tx_service_fee_per: this.ruleForm.tx_service_fee_per,
                        tx_service_fee: this.ruleForm.tx_service_fee
                    },{
                        type: 2,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per2,
                        cz_service_fee: this.ruleForm.cz_service_fee2
                    },{
                        type: 3,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per3,
                        cz_service_fee: this.ruleForm.cz_service_fee3
                    },{
                        type: 4,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per4,
                        cz_service_fee: this.ruleForm.cz_service_fee4
                    }],
                    note: this.ruleForm.note
                }
                let submitResult = await merchantManage.submitCheckMessage(sumbitData)
                if(submitResult.code == 200) {
                    if(sumbitData.status == 1) {
                        this.$message.success('审核通过！')
                    } else if(sumbitData.status == -1) {
                        this.$message.error('审核不通过！')
                    }
                }
                this.$emit('checkDialogFlag', false)
            })
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .item {
        padding: 15px 0;
    }
    .text {
        width: 140px;
        text-align: right;
        display: inline-block;
    }
    .form {
        margin-top: 30px;
    }
}   
</style>
